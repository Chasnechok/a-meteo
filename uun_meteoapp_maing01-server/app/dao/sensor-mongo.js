"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class SensorMongo extends UuObjectDao {

  async createSchema(){
  }
  async create(uuObject) {
    return await super.insertOne(uuObject);
  }
  async list(awid, sortBy, order, state, pageInfo) {
    const filter = { awid, state };

    const sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };

    return await super.find(filter, pageInfo, sort);
  }
  async delete(uuObject) {
    let filter = {
      awid: uuObject.awid,
      id: uuObject.id,
    };
    return await super.deleteOne(filter);
  }
  async update(uuObject) {


    let filter = {
      awid: uuObject.awid,
      id: uuObject.id,
    };

    let object = {
      name: uuObject.name
    };
    return await super.findOneAndUpdate(filter, object, "NONE");
  }
  async get(awid, id) {
    let filter = {
      awid: awid,
      id: id,
    };
    return await super.findOne(filter);
  }

}

module.exports = SensorMongo;
