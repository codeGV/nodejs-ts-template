'use strict'
import config from "config";

const dbConfig:any = config.get('db');
import  mongoose from "mongoose";
const globalAny:any = global;
// const mongoose = require('mongoose')

module.exports.configure =  (logger:any) => {
    const log = logger.start('settings/database:configure')
    mongoose.Promise = global.Promise

    let connect = function () {
        log.info('connecting to', dbConfig)
        mongoose.connect(dbConfig.url)
    }

    connect()

    let db = mongoose.connection

    db.on('connected', function () {
        log.info('DB Connected')
    })

    db.on('error', function (err:any) {
        log.error('Mongoose default connection error: ' + err)
    })

    db.on('disconnected', function () {
        log.info('Again going to connect DB')
        connect()
    })

    // global.db = require('../models');
    require('../models');
    globalAny.db = mongoose.models
    return globalAny.db
}
