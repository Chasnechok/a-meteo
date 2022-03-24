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

const Delete = {
  UC_CODE: `${LOCATION_ERROR_PREFIX}delete/`,
  InvalidDtoIn: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  LocationDaoDeleteFailed: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}locationDaoDeleteFailed`;
      this.message = "Delete location DAO delete failed.";
    }
  },
  LocationDoesNotExist: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}locationDoesNotExist`;
      this.message = "Location does not exist.";
    }
  },
};

const Update = {
  UC_CODE: `${LOCATION_ERROR_PREFIX}update/`,
  
  InvalidDtoIn: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  LocationDaoUpdateFailed: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}locationDaoUpdateFailed`;
      this.message = "Update location DAO update failed.";
    }
  },
  LocationDoesNotExist: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}locationDoesNotExist`;
      this.message = "Location does not exist.";
    }
  },
};

const List = {
  UC_CODE: `${LOCATION_ERROR_PREFIX}list/`,
  InvalidDtoIn: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  LocationDaoListFailed: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}locationDaoListFailed`;
      this.message = "List location DAO list failed.";
    }
  },
};

module.exports = {
  List,
  Update,
  Delete,
  Get,
  Create
};
