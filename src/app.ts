'use strict'

global.Promise = require('bluebird')

import express from "express";

import bodyParser from "body-parser";
import  morgan from "morgan";
import config from "config";

const appConfig:any = config.get('app')
const webConfig:any = config.get('webServer')

const logger = require('@open-age/logger')('server')
const port = process.env.PORT || appConfig.port || webConfig.port
const Http = require('http');

const app = express()
var server = Http.createServer(app);


app.use(bodyParser.json({
    limit: "50mb"
}));
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
}));
//  mongoose.set('useCreateIndex', true);

const boot = () => {
    const log = logger.start('app:boot')
    log.info(`environment:  ${process.env.NODE_ENV}`)
    log.info('starting server ...')

    app.listen(port, () => {
        console.log(`listening on port: ${port}`)
        log.end()
    })
}

const init = () => {
    require('./settings/database').configure(logger)
    require('./settings/express').configure(app, logger)
    require('./settings/routes').configure(app, logger)
    boot()
}


app.use(morgan('dev'));
init()