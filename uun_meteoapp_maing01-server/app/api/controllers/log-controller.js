"use strict";
const LogAbl = require("../../abl/log-abl.js");

class LogController {

  create(ucEnv) {
    return LogAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new LogController();
