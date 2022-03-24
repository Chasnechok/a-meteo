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
  async delete(uuObject) {
    let filter = {
      awid: uuObject.awid,
      locationCode: uuObject.locationCode ,
    };
    return await super.deleteOne(filter);
  }
  async update(uuObject) {
    let filter = {
      awid: uuObject.awid,
      locationCode: uuObject.locationCode,
    };

    let object = {
      name: uuObject.name
    };
    return await super.findOneAndUpdate(filter, object, "NONE");
  }
  async list(awid, sortBy, order, state, pageInfo) {
    const filter = { awid, state };

    const sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };

    return await super.find(filter, pageInfo, sort);
  }
}


module.exports = LocationMongo;
