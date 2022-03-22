"use strict";

const MeteoappMainUseCaseError = require("./meteoapp-main-use-case-error.js");
const LOCATION_ERROR_PREFIX = `${MeteoappMainUseCaseError.ERROR_PREFIX}location/`;

const Create = {
  UC_CODE: `${LOCATION_ERROR_PREFIX}create/`,
  InvalidDtoIn: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  LocationDaoCreateFailed: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}locationDaoCreateFailed`;
      this.message = "Create location DAO create failed.";
    }
  },
};

const Get = {
  UC_CODE: `${LOCATION_ERROR_PREFIX}get/`,
  
  InvalidDtoIn: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  LocationDaoGetFailed: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}locationDaoGetFailed`;
      this.message = "Get location DAO get failed.";
    }
  },
  LocationDoesNotExist: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}locationDoesNotExist`;
      this.message = "Location does not exist.";
    }
  },
};

module.exports = {
  Get,
  Create
};
