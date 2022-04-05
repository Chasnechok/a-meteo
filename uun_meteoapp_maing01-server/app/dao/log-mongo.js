"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class LogMongo extends UuObjectDao {

  async createSchema(){
  }
  async delete(code) {
    let filter = {
      code:code
    };
    return await super.deleteOne(filter);
  }
  async create(uuObject) {
    uuObject.datetime=new Date(uuObject.datetime);
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
  async list(awid, sortBy, order, state, pageInfo,dateFrom,dateTo) {

    let filter=  {};

    if(!dateFrom||!dateTo){
       filter = {
        awid: awid,
        state: state
      };
    }
    else {
     filter = {
      awid: awid,
      state: state,
    datetime:{$gte: new Date(dateFrom),$lt: new Date(dateTo)}
    };

    }
    const sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };

    return await super.find(filter, pageInfo, sort);
  }

  async listByCode(sensorCode,awid, sortBy, order, state, pageInfo,dateFrom,dateTo) {

    let filter=  {};

    if(!dateFrom||!dateTo){
      filter = {
        awid: awid,
        state: state,
        "sensorCode": {$in : [sensorCode]},
      };
    }
    else {
      filter = {
        awid: awid,
        state: state,
        "sensorCode": {$in : [sensorCode]},
        datetime:{$gte: new Date(dateFrom),$lt: new Date(dateTo)}
      };

    }
    const sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };

    return await super.find(filter, pageInfo, sort);
  }
  async listByLocationCode(locationCode,awid, sortBy, order, state, pageInfo,dateFrom,dateTo) {

    let filter=  {};

    if(!dateFrom||!dateTo){
      filter = {
        awid: awid,
        state: state,
        "locationCode": {$in : [locationCode]},
      };
    }
    else {
      filter = {
        awid: awid,
        state: state,
        "locationCode": {$in : [locationCode]},
        datetime:{$gte: new Date(dateFrom),$lt: new Date(dateTo)}
      };

    }
    const sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };

    return await super.find(filter, pageInfo, sort);
  }
}

module.exports = LogMongo;
