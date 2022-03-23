"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class LocationMongo extends UuObjectDao {

  async createSchema(){
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }
  async getByLocationCode(awid, locationCode) {
    let filter = {
      awid: awid,
      locationCode: locationCode,
    };
    return await super.findOne(filter);
  }
}

module.exports = LocationMongo;
