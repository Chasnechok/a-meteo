"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/log-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
};

class LogAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("log");
    this.sensordao = DaoFactory.getDao("sensor");

  }

  async create(awid, dtoIn) {
    


    let validationResult = this.validator.validate("logCreateDtoInType", dtoIn);
    // HDS 2.2., AS  2.2.1., HDS 2.3., AS  2.3.1.
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );


    dtoIn.awid = awid;
    
    let newSensor;
    let sensor;

    //get sensor by code
    try {
      sensor = await this.sensordao.getByCode(dtoIn.awid,dtoIn.code);


    } catch (e) {
      // AS  3.1.
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.LogDaoCreateFailed({ uuAppErrorMap });
      }
      throw e;
    }
    //sensor code does not exist, creates a new sensor with a searched sensor code
    if (!sensor) {
      let dtoIn2 = {
        "name": "",
        "code": dtoIn.code,
        "locationCode": "",
        "state": "inital",
        "awid": dtoIn.awid
      }
    try {
      newSensor = await this.sensordao.create(dtoIn2);


    } catch (e) {
      // AS  3.1.
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.LogDaoCreateFailed({ uuAppErrorMap });
      }
      throw e;
    }
    }else{
      //if sensor.state is active or passive, log receives locationId from the sensor
      if(!(sensor.state === "initial")){
        dtoIn.locationCode = sensor.locationCode
      }else{return} //if forbidden, throws away

    }
    // HDS 4.
    //create log with active state
    let log;
    dtoIn.state = "active";
    try {
      log = await this.dao.create(dtoIn);


    } catch (e) {
      // AS  3.1.
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.LogDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    return log;
  }

}

module.exports = new LogAbl();
