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
  
  SubjectManInstanceDoesNotExist: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ Get.UC_CODE }subjectManInstanceDoesNotExist`;
      this.message = "SubjectManInstance does not exist."; }
  },

  SubjectManInstanceNotInProperState: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ Get.UC_CODE }subjectManInstanceNotInProperState`;
      this.message = "SubjectManInstance is not in proper state (active)."; }
  },

  InvalidDtoIn: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SensorDaoGetFailed: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}sensorDaoGetFailed`;
      this.message = "Get sensor DAO get failed.";
    }
  },
};

const Update = {
  UC_CODE: `${SENSOR_ERROR_PREFIX}update/`,
  
  SubjectManInstanceDoesNotExist: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ Update.UC_CODE }subjectManInstanceDoesNotExist`;
      this.message = "SubjectManInstance does not exist."; }
  },

  SubjectManInstanceNotInProperState: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ Update.UC_CODE }subjectManInstanceNotInProperState`;
      this.message = "SubjectManInstance is not in proper state (active)."; }
  },

  InvalidDtoIn: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SensorDaoUpdateFailed: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}sensorDaoUpdateFailed`;
      this.message = "Update sensor DAO update failed.";
    }
  },
};

const List = {
  UC_CODE: `${SENSOR_ERROR_PREFIX}list/`,
  
  SubjectManInstanceDoesNotExist: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ List.UC_CODE }subjectManInstanceDoesNotExist`;
      this.message = "SubjectManInstance does not exist."; }
  },

  SubjectManInstanceNotInProperState: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ List.UC_CODE }subjectManInstanceNotInProperState`;
      this.message = "SubjectManInstance is not in proper state (active)."; }
  },

  InvalidDtoIn: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SensorDaoListFailed: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}sensorDaoListFailed`;
      this.message = "List sensor DAO list failed.";
    }
  },
};

const Delete = {
  UC_CODE: `${SENSOR_ERROR_PREFIX}delete/`,
  
  SubjectManInstanceDoesNotExist: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ Delete.UC_CODE }subjectManInstanceDoesNotExist`;
      this.message = "SubjectManInstance does not exist."; }
  },

  SubjectManInstanceNotInProperState: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ Delete.UC_CODE }subjectManInstanceNotInProperState`;
      this.message = "SubjectManInstance is not in proper state (active)."; }
  },

  InvalidDtoIn: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SensorDaoDeleteFailed: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}sensorDaoDeleteFailed`;
      this.message = "Delete sensor DAO delete failed.";
    }
  },
};

module.exports = {
  Delete,
  List,
  Update,
  Get,
  Create
};
