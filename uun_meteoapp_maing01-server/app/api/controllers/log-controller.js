"use strict";
const LogAbl = require("../../abl/log-abl.js");

class LogController {

  delete(ucEnv) {
    return LogAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  bulkCreate(ucEnv) {
    return LogAbl.bulkCreate(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  listByLocationCode(ucEnv) {
    return LogAbl.listByLocationCode(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  listBySensorCode(ucEnv) {
    return LogAbl.listBySensorCode(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  list(ucEnv) {
    return LogAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return LogAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return LogAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new LogController();
