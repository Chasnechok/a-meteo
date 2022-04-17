'use strict'
const { lchown } = require('fs')
const Path = require('path')
const { Validator } = require('uu_appg01_server').Validation
const { DaoFactory } = require('uu_appg01_server').ObjectStore
const { ValidationHelper } = require('uu_appg01_server').AppServer
const Errors = require('../api/errors/log-error.js')

const WARNINGS = {
    createUnsupportedKeys: {
        code: `${Errors.Create.UC_CODE}unsupportedKeys`,
    },
    getUnsupportedKeys: {
        code: `${Errors.Get.UC_CODE}unsupportedKeys`,
    },
    listUnsupportedKeys: {
        code: `${Errors.List.UC_CODE}unsupportedKeys`,
    },
    listBySensorCodeUnsupportedKeys: {
        code: `${Errors.ListBySensorCode.UC_CODE}unsupportedKeys`,
    },
    listByLocationCodeUnsupportedKeys: {
        code: `${Errors.ListByLocationCode.UC_CODE}unsupportedKeys`,
    },
    bulkCreateUnsupportedKeys: {
        code: `${Errors.BulkCreate.UC_CODE}unsupportedKeys`,
    },
    deleteUnsupportedKeys: {
        code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
    },
}

const DEFAULTS = {
    sortBy: 'name',
    order: 'asc',
    state: 'active',
    pageIndex: 0,
    pageSize: 100,
}

class LogAbl {
    constructor() {
        this.validator = Validator.load()
        this.dao = DaoFactory.getDao('log')
        this.sensordao = DaoFactory.getDao('sensor')
    }

    async delete(awid, dtoIn) {
        let validationResult = this.validator.validate('logDeleteDtoInType', dtoIn)
        // HDS 2.2., AS  2.2.1., HDS 2.3., AS  2.3.1.
        let uuAppErrorMap = ValidationHelper.processValidationResult(
            dtoIn,
            validationResult,
            WARNINGS.deleteUnsupportedKeys.code,
            Errors.Delete.InvalidDtoIn
        )
        dtoIn.awid = awid
        let log

        try {
            log = await this.dao.delete(dtoIn.code)
        } catch (e) {
            // AS  3.1.
            if (e instanceof ObjectStoreError) {
                throw new Errors.Delete.LogDaoDeleteFailed({ uuAppErrorMap })
            }
            throw e
        }

        return {
            log,
            uuAppErrorMap,
        }
    }

    async bulkCreate(awid, dtoIn) {
        let validationResult = this.validator.validate('logBulkCreateDtoInType', dtoIn)
        // HDS 2.2., AS  2.2.1., HDS 2.3., AS  2.3.1.
        let uuAppErrorMap = ValidationHelper.processValidationResult(
            dtoIn,
            validationResult,
            WARNINGS.bulkCreateUnsupportedKeys.code,
            Errors.BulkCreate.InvalidDtoIn
        )
        dtoIn.awid = awid

        let sensor
        let locationCode = ''

        let sensorCode = dtoIn['array'][0]['sensorCode']

        try {
            sensor = await this.sensordao.getBySensorCode(dtoIn.awid, sensorCode)
        } catch (e) {
            // AS  3.1.
            if (e instanceof ObjectStoreError) {
                throw new Errors.BulkCreate.LogDaoBulkCreateFailed({ uuAppErrorMap })
            }
            throw e
        }
        //sensor code does not exist, creates a new sensor with a searched sensor code
        if (!sensor) {
            let dtoIn2 = {
                name: null,
                code: sensorCode,
                locationCode: null,
                state: 'initial',
                awid: dtoIn.awid,
            }
            try {
                await this.sensordao.create(dtoIn2)
            } catch (e) {
                // AS  3.1.
                if (e instanceof ObjectStoreError) {
                    throw new Errors.Create.LogDaoCreateFailed({ uuAppErrorMap })
                }
                throw e
            }
            return uuAppErrorMap
        } else {
            //if sensor.state is active or passive, log receives locationId from the sensor
            if (sensor.state === 'initial' || sensor.state === 'forbidden') return
            locationCode = sensor.locationCode
        }
        for (let i = 0; i < dtoIn['array'].length; i++) {
            const crypto = require('crypto')

            let log = dtoIn['array'][i]
            log.code = crypto.randomBytes(16).toString('hex')
            log.locationCode = locationCode
            log.state = 'active'
            log.awid = awid

            try {
                log = await this.dao.create(log)
            } catch (e) {
                // AS  3.1.
                if (e instanceof ObjectStoreError) {
                    throw new Errors.Create.LogDaoCreateFailed({ uuAppErrorMap }, e)
                }
                throw e
            }
        }
    }

    async listByLocationCode(awid, dtoIn) {
        let validationResult = this.validator.validate('listByLocationCodeDtoInType', dtoIn)
        // HDS 2.2., AS  2.2.1., HDS 2.3., AS  2.3.1.
        let uuAppErrorMap = ValidationHelper.processValidationResult(
            dtoIn,
            validationResult,
            WARNINGS.listByLocationCodeUnsupportedKeys.code,
            Errors.ListByLocationCode.InvalidDtoIn
        )
        // HDS 2.4
        if (!dtoIn.sortBy) dtoIn.sortBy = DEFAULTS.sortBy
        if (!dtoIn.order) dtoIn.order = DEFAULTS.order
        if (!dtoIn.pageInfo) dtoIn.pageInfo = {}
        if (!dtoIn.state) dtoIn.state = DEFAULTS.state
        if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.pageSize
        if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.pageIndex
        dtoIn.awid = awid

        // HDS 3.
        let list
        try {
            list = await this.dao.listByLocationCode(
                dtoIn.locationCode,
                awid,
                dtoIn.sortBy,
                dtoIn.order,
                dtoIn.state,
                dtoIn.pageInfo,
                dtoIn.dateFrom,
                dtoIn.dateTo
            )
        } catch (e) {
            if (e instanceof ObjectStoreError) {
                throw new Errors.ListByLocationCode.LogDaoListByLocationCodeFailed({ uuAppErrorMap })
            }
            throw e
        }

        // HDS 4.
        list.uuAppErrorMap = uuAppErrorMap
        return list
    }

    async listBySensorCode(awid, dtoIn) {
        // HDS 2., HDS 2.1.
        let validationResult = this.validator.validate('listBySensorCodeDtoInType', dtoIn)
        // HDS 2.2., AS  2.2.1., HDS 2.3., AS  2.3.1.
        let uuAppErrorMap = ValidationHelper.processValidationResult(
            dtoIn,
            validationResult,
            WARNINGS.listBySensorCodeUnsupportedKeys.code,
            Errors.ListBySensorCode.InvalidDtoIn
        )
        // HDS 2.4
        if (!dtoIn.sortBy) dtoIn.sortBy = DEFAULTS.sortBy
        if (!dtoIn.order) dtoIn.order = DEFAULTS.order
        if (!dtoIn.pageInfo) dtoIn.pageInfo = {}
        if (!dtoIn.state) dtoIn.state = DEFAULTS.state
        if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.pageSize
        if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.pageIndex
        dtoIn.awid = awid

        // HDS 3.
        let list
        try {
            list = await this.dao.listByCode(
                dtoIn.sensorCode,
                awid,
                dtoIn.sortBy,
                dtoIn.order,
                dtoIn.state,
                dtoIn.pageInfo,
                dtoIn.dateFrom,
                dtoIn.dateTo
            )
        } catch (e) {
            // AS  3.1.
            if (e instanceof ObjectStoreError) {
                throw new Errors.ListBySensorCode.LogDaoListBySensorCodeFailed({ uuAppErrorMap })
            }
            throw e
        }

        // HDS 4.
        list.uuAppErrorMap = uuAppErrorMap
        return list
    }

    async list(awid, dtoIn) {
        // HDS 2., HDS 2.1.
        let validationResult = this.validator.validate('logListDtoInType', dtoIn)
        // HDS 2.2., AS  2.2.1., HDS 2.3., AS  2.3.1.
        let uuAppErrorMap = ValidationHelper.processValidationResult(
            dtoIn,
            validationResult,
            WARNINGS.listUnsupportedKeys.code,
            Errors.List.InvalidDtoIn
        )
        // HDS 2.4
        if (!dtoIn.sortBy) dtoIn.sortBy = DEFAULTS.sortBy
        if (!dtoIn.order) dtoIn.order = DEFAULTS.order
        if (!dtoIn.pageInfo) dtoIn.pageInfo = {}
        if (!dtoIn.state) dtoIn.state = DEFAULTS.state
        if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.pageSize
        if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.pageIndex
        dtoIn.awid = awid

        // HDS 3.
        let list
        try {
            list = await this.dao.list(
                awid,
                dtoIn.sortBy,
                dtoIn.order,
                dtoIn.state,
                dtoIn.pageInfo,
                dtoIn.dateFrom,
                dtoIn.dateTo
            )
        } catch (e) {
            // AS  3.1.
            if (e instanceof ObjectStoreError) {
                throw new Errors.List.LogDaoListFailed({ uuAppErrorMap })
            }
            throw e
        }

        // HDS 4.
        list.uuAppErrorMap = uuAppErrorMap
        return list
    }

    async get(awid, dtoIn) {
        let validationResult = this.validator.validate('logGetDtoInType', dtoIn)
        // HDS 2.2., AS  2.2.1., HDS 2.3., AS  2.3.1.
        let uuAppErrorMap = ValidationHelper.processValidationResult(
            dtoIn,
            validationResult,
            WARNINGS.getUnsupportedKeys.code,
            Errors.Get.InvalidDtoIn
        )

        // HDS 2.4.
        dtoIn.awid = awid
        // HDS 3.
        let logs

        try {
            logs = await this.dao.getAllByCode(dtoIn.awid, dtoIn.code)
        } catch (e) {
            // AS  3.1.
            if (e instanceof ObjectStoreError) {
                throw new Errors.Get.LogDaoGetFailed({ uuAppErrorMap })
            }
            throw e
        }

        //returns log + errormap
        return {
            logs,
            uuAppErrorMap,
        }
    }

    async create(awid, dtoIn) {
        let validationResult = this.validator.validate('logCreateDtoInType', dtoIn)
        // HDS 2.2., AS  2.2.1., HDS 2.3., AS  2.3.1.
        let uuAppErrorMap = ValidationHelper.processValidationResult(
            dtoIn,
            validationResult,
            WARNINGS.createUnsupportedKeys.code,
            Errors.Create.InvalidDtoIn
        )

        //random log code using crypto module
        const crypto = require('crypto')
        dtoIn.code = crypto.randomBytes(16).toString('hex')

        dtoIn.locationCode = null
        dtoIn.state = 'active'
        dtoIn.awid = awid

        let sensor

        //get sensor by code
        try {
            sensor = await this.sensordao.getByCode(dtoIn.awid, dtoIn.sensorCode)
        } catch (e) {
            // AS  3.1.
            if (e instanceof ObjectStoreError) {
                throw new Errors.Create.LogDaoCreateFailed({ uuAppErrorMap })
            }
            throw e
        }
        //sensor code does not exist, creates a new sensor with a searched sensor code
        if (!sensor) {
            let dtoIn2 = {
                name: null,
                code: dtoIn.sensorCode,
                locationCode: null,
                state: 'initial',
                awid: dtoIn.awid,
            }

            try {
                await this.sensordao.create(dtoIn2)
            } catch (e) {
                // AS  3.1.
                if (e instanceof ObjectStoreError) {
                    throw new Errors.Create.LogDaoCreateFailed({ uuAppErrorMap })
                }
                throw e
            }
            return uuAppErrorMap
        } else {
            //if sensor.state is active or passive, log receives locationId from the sensor
            if (sensor.state === 'initial' || sensor.state === 'forbidden') {
                dtoIn.locationCode = sensor.locationCode
            }
        }
        // HDS 4.
        //create log
        let log
        try {
            log = await this.dao.create(dtoIn)
        } catch (e) {
            // AS  3.1.
            if (e instanceof ObjectStoreError) {
                throw new Errors.Create.LogDaoCreateFailed({ uuAppErrorMap }, e)
            }
            throw e
        }

        return {
            log,
            uuAppErrorMap,
        }
    }
}

module.exports = new LogAbl()
