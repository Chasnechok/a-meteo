"use strict";

const MeteoappMainUseCaseError = require("./meteoapp-main-use-case-error.js");
const LOG_ERROR_PREFIX = `${MeteoappMainUseCaseError.ERROR_PREFIX}log/`;

const Create = {
  UC_CODE: `${LOG_ERROR_PREFIX}create/`,
  
};

module.exports = {
  Create
};
