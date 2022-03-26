"use strict";
const LogAbl = require("../../abl/log-abl.js");

class LogController {

  get(ucEnv) {
    return LogAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return LogAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new LogController();
