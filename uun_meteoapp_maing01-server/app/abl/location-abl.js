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
  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`
  },
  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`
  },
};

const DEFAULTS = {
  sortBy: "name",
  order: "asc",
  state: "active",
  pageIndex: 0,
  pageSize: 100,
};
class LocationAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("location");
  }

  async list(awid, dtoIn) {
    
    let validationResult = this.validator.validate("locationListDtoInType", dtoIn);
    // HDS 2.2., AS  2.2.1., HDS 2.3., AS  2.3.1.
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    )
    
    if (!dtoIn.sortBy) dtoIn.sortBy = DEFAULTS.sortBy;
    if (!dtoIn.order) dtoIn.order = DEFAULTS.order;
    if (!dtoIn.state) dtoIn.state = DEFAULTS.state;
    if (!dtoIn.pageInfo) dtoIn.pageInfo = {};
    if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.pageSize;
    if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.pageIndex;
    dtoIn.awid = awid;
    
    let list;
    try {
      list = await this.dao.list(awid, dtoIn.sortBy, dtoIn.order, dtoIn.state, dtoIn.pageInfo);
    } catch (e) {
      // AS  3.1.
      if (e instanceof ObjectStoreError) {
        throw new Errors.List.LocationDaoListFailed({ uuAppErrorMap });
      }
      throw e;
    }

    // HDS 4.
    list.uuAppErrorMap = uuAppErrorMap;
    return list;
    }
  async update(awid, dtoIn) {
    let validationResult = this.validator.validate("locationUpdateDtoInType", dtoIn);
    // HDS 2.2., AS  2.2.1., HDS 2.3., AS  2.3.1.
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );
    dtoIn.awid = awid;
    let locationToUpdate;
    
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
    //locationCode does not exist = error, else update it
    if (!location) {
      throw new Errors.Get.LocationDoesNotExist({ uuAppErrorMap });
    }else{

    try {
      locationToUpdate = await this.dao.update(dtoIn);
    } catch (e) {
      // AS  3.1.
      if (e instanceof ObjectStoreError) {
        throw new Errors.Update.LocationDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
    if(!locationToUpdate) {
      throw new Errors.Update.LocationDoesNotExist({ uuAppErrorMap });
    }
    return {
      locationToUpdate,
      uuAppErrorMap
    }}
  }

  async delete(awid, dtoIn) {
    
    let validationResult = this.validator.validate("locationDeleteDtoInType", dtoIn);
    // HDS 2.2., AS  2.2.1., HDS 2.3., AS  2.3.1.
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );
    dtoIn.awid = awid;
    let location;

    try {
      location = await this.dao.delete(dtoIn);
    } catch (e) {
      // AS  3.1.
      if (e instanceof ObjectStoreError) {
        throw new Errors.Get.LocationDaoGetFailed({ uuAppErrorMap });
      }
      throw e;
    }
    
    return {
      location,
      uuAppErrorMap
    }
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
