"use strict";

const MeteoappMainUseCaseError = require("./meteoapp-main-use-case-error.js");
const LOG_ERROR_PREFIX = `${MeteoappMainUseCaseError.ERROR_PREFIX}log/`;

const Create = {
  UC_CODE: `${LOG_ERROR_PREFIX}create/`,
  
  InvalidDtoIn: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  LogDaoCreateFailed: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}logDaoCreateFailed`;
      this.message = "Create log DAO create failed.";
    }
  },
};

module.exports = {
  Create
};
