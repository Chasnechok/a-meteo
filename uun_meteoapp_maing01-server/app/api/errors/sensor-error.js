"use strict";

const MeteoappMainUseCaseError = require("./meteoapp-main-use-case-error.js");
const SENSOR_ERROR_PREFIX = `${MeteoappMainUseCaseError.ERROR_PREFIX}sensor/`;


const Create = {
  UC_CODE: `${SENSOR_ERROR_PREFIX}create/`,

  SubjectManInstanceDoesNotExist: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ Create.UC_CODE }subjectManInstanceDoesNotExist`;
      this.message = "SubjectManInstance does not exist."; }
  },

  SubjectManInstanceNotInProperState: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ Create.UC_CODE }subjectManInstanceNotInProperState`;
      this.message = "SubjectManInstance is not in proper state (active)."; }
  },

  InvalidDtoIn: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SensorDaoCreateFailed: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}sensorDaoCreateFailed`;
      this.message = "Create sensor DAO create failed.";
    }
  },
};

const Get = {
  UC_CODE: `${SENSOR_ERROR_PREFIX}get/`,
  
};

const Update = {
  UC_CODE: `${SENSOR_ERROR_PREFIX}update/`,
  
};

const List = {
  UC_CODE: `${SENSOR_ERROR_PREFIX}list/`,
  
};

const Delete = {
  UC_CODE: `${SENSOR_ERROR_PREFIX}delete/`,
  
};

module.exports = {
  Delete,
  List,
  Update,
  Get,
  Create
};
