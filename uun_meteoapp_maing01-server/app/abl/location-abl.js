"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/location-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`
  },
};

class LocationAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("location");
  }

  async get(awid, dtoIn) {
    // HDS 1., HDS 1.1
   
    // HDS 2., HDS 2.1.
    let validationResult = this.validator.validate("locationGetDtoInType", dtoIn);
    // HDS 2.2., AS  2.2.1., HDS 2.3., AS  2.3.1.
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );
    
    // HDS 2.4.
    dtoIn.awid = awid;
    // HDS 3.
    let location;

    try {
      location = await this.dao.getByLocationCode(dtoIn.awid,dtoIn.locationCode);


    } catch (e) {
      // AS  3.1.
      if (e instanceof ObjectStoreError) {
        throw new Errors.Get.LocationDaoGetFailed({ uuAppErrorMap });
      }
      throw e;
    }
    //locationCode does not exist
    if (!location) {
      throw new Errors.Get.LocationDoesNotExist({ uuAppErrorMap });
    }
    //returns location + errormap
    return {
      location,
      uuAppErrorMap
  }}
  async create(awid, dtoIn) {
    
    let validationResult = this.validator.validate("locationCreateDtoInType", dtoIn);
    // HDS 2.2., AS  2.2.1., HDS 2.3., AS  2.3.1.
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );
    //creates an unique code
    function getUniqueCode() {
      return (new Date().getTime()).toString(36)
    }
    //creates unique locationCode
    dtoIn.locationCode = getUniqueCode()
    dtoIn.state = "active";
    dtoIn.awid = awid;
    // HDS 3.
    let location;

    try {
      location = await this.dao.create(dtoIn);


    } catch (e) {
      // AS  3.1.
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.LocationDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // HDS 4.
    location.uuAppErrorMap = uuAppErrorMap;
    return location;
  }
  }



module.exports = new LocationAbl();
