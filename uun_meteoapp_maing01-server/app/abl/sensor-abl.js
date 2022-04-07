"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory,ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/sensor-error.js");
//const SubjectManAbl = require("./meteoapp-main-abl");
const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`
  },
  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`
  },
  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`
  },

};

const DEFAULTS = {
  sortBy: "name",
  order: "asc",
  state: "active",
  pageIndex: 0,
  pageSize: 100,
};

class SensorAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("sensor");
  }

  async delete(awid, dtoIn) {
    // HDS 1., HDS 1.1

    // HDS 2., HDS 2.1.
    let validationResult = this.validator.validate("sensorDeleteDtoInType", dtoIn);
    // HDS 2.2., AS  2.2.1., HDS 2.3., AS  2.3.1.
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );
    // HDS 2.4.
    dtoIn.awid = awid;
    // HDS 3.
    let sensor;

    try {
      sensor = await this.dao.delete(dtoIn);


    } catch (e) {
      // AS  3.1.
      if (e instanceof ObjectStoreError) {
        throw new Errors.Delete.SensorDaoDeleteFailed({ uuAppErrorMap });
      }
      throw e;
    }

    // HDS 4.
    return sensor;
  }

  async list(awid, dtoIn) {


    // HDS 2., HDS 2.1.
    let validationResult = this.validator.validate("sensorListDtoInType", dtoIn);
    // HDS 2.2., AS  2.2.1., HDS 2.3., AS  2.3.1.
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );
    // HDS 2.4
    if (!dtoIn.sortBy) dtoIn.sortBy = DEFAULTS.sortBy;
    if (!dtoIn.order) dtoIn.order = DEFAULTS.order;
    if (!dtoIn.pageInfo) dtoIn.pageInfo = {};
    if (!dtoIn.state) dtoIn.state = DEFAULTS.state;
    if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.pageSize;
    if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.pageIndex;
    dtoIn.awid = awid;

    // HDS 3.
    let list;
    try {
      list = await this.dao.list(awid, dtoIn.sortBy, dtoIn.order, dtoIn.state, dtoIn.pageInfo);
    } catch (e) {
      // AS  3.1.
      if (e instanceof ObjectStoreError) {
        throw new Errors.List.SensorDaoListFailed({ uuAppErrorMap });
      }
      throw e;
    }

    // HDS 4.
    list.uuAppErrorMap = uuAppErrorMap;
    return list;
  }

  async update(awid, dtoIn) {
    // HDS 1., HDS 1.1


    // HDS 2., HDS 2.1.
    let validationResult = this.validator.validate("sensorUpdateDtoInType", dtoIn);
    // HDS 2.2., AS  2.2.1., HDS 2.3., AS  2.3.1.
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );
    // HDS 2.4.
    dtoIn.awid = awid;


    // HDS 3.
    let sensor;

    try {
      sensor = await this.dao.update(dtoIn);


    } catch (e) {
      // AS  3.1.
      if (e instanceof ObjectStoreError) {
        throw new Errors.Update.SensorDaoUpdateFailed({ uuAppErrorMap });
      }
      throw e;
    }

    // HDS 4.
    return sensor;
  }

  async get(awid, dtoIn) {
    // HDS 1., HDS 1.1
    // HDS 2., HDS 2.1.
    let validationResult = this.validator.validate("sensorGetDtoInType", dtoIn);
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
    let sensor;

    try {
      sensor = await this.dao.get(dtoIn.awid,dtoIn.id);


    } catch (e) {
      // AS  3.1.
      if (e instanceof ObjectStoreError) {
        throw new Errors.Get.SensorDaoGetFailed({ uuAppErrorMap });
      }
      throw e;
    }

    // HDS 4.
    return sensor;
  }

  async create(awid, dtoIn) {


    // HDS 2., HDS 2.1.
    let validationResult = this.validator.validate("sensorCreateDtoInType", dtoIn);
    // HDS 2.2., AS  2.2.1., HDS 2.3., AS  2.3.1.
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );
    // HDS 2.4.

    if(!dtoIn.name){
      dtoIn.name = null;
    }
    if(!dtoIn.locationCode){
      dtoIn.locationCode =null;
    } 
    dtoIn.state = "initial";
    dtoIn.awid = awid;


    // HDS 3.
    let sensor;

    try {
      sensor = await this.dao.create(dtoIn);


    } catch (e) {
      // AS  3.1.
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.SensorDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // HDS 4.
    sensor.uuAppErrorMap = uuAppErrorMap;
    return sensor;
  }

}

module.exports = new SensorAbl();
