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

const Get = {
  UC_CODE: `${LOG_ERROR_PREFIX}get/`,

  InvalidDtoIn: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  LogDaoGetFailed: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}logDaoGetFailed`;
      this.message = "Get log DAO get failed.";
    }
  },
  LogDoesNotExist: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}logDoesNotExist`;
      this.message = "Log does not exist.";
    }
  },
};

const List = {
  UC_CODE: `${LOG_ERROR_PREFIX}list/`,
  InvalidDtoIn: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  LogDaoGetFailed: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}logDaoListFailed`;
      this.message = "List log DAO list failed.";
    }
  },
  LogDoesNotExist: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}logDoesNotExist`;
      this.message = "Log does not exist.";
    }
  },
};

const ListBySensorCode = {
  UC_CODE: `${LOG_ERROR_PREFIX}listBySensorCode/`,
  InvalidDtoIn: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  LogDaoGetFailed: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}logDaoGetFailed`;
      this.message = "Get log DAO get failed.";
    }
  },
  LogDoesNotExist: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}logDoesNotExist`;
      this.message = "Log does not exist.";
    }
  },
};

const ListByLocationCode = {
  UC_CODE: `${LOG_ERROR_PREFIX}listByLocationCode/`,
  InvalidDtoIn: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  LogDaoGetFailed: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}logDaoGetFailed`;
      this.message = "Get log DAO get failed.";
    }
  },
  LogDoesNotExist: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}logDoesNotExist`;
      this.message = "Log does not exist.";
    }
  },
};

const BulkCreate = {
  UC_CODE: `${LOG_ERROR_PREFIX}bulkCreate/`,
  InvalidDtoIn: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${BulkCreate.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  LogDaoCreateFailed: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${BulkCreate.UC_CODE}logDaoCreateFailed`;
      this.message = "Create log DAO create failed.";
    }
  },
};


const Delete = {
  UC_CODE: `${LOG_ERROR_PREFIX}delete/`,
  InvalidDtoIn: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  LogDaoDeleteFailed: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}logDaoDeleteFailed`;
      this.message = "Delete log DAO delete failed.";
    }
  },
};

module.exports = {
  Delete,
  BulkCreate,
  ListByLocationCode,
  ListBySensorCode,
  List,
  Get,
  Create
};
