"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class LogMongo extends UuObjectDao {

  async createSchema(){
  }
  async create(uuObject) {
    return await super.insertOne(uuObject);
  }
  async getAllByCode(awid, code) {
    let filter = {
      awid: awid,
      "code": {$in : [code]},
    };
    return await super.find(filter);
  }
  async getAllLogs(uuObject) {
    return await super.find(uuObject);
  }
}

module.exports = LogMongo;
