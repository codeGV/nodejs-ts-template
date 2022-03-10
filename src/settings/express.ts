'use strict'
// const path = require('path');
import path from 'path';
const cors = require('cors')
const express = require('express')

const bodyParser = require('body-parser')
const logger = require('@open-age/logger')('server')

export const configure = (app:any) => {
    const log = logger.start('settings/express/configure')

    app.use(bodyParser.json())
    app.use(cors())

    app.use(bodyParser.urlencoded({
        extended: true
    }))

    app.use(bodyParser({
        limit: '50mb',
        keepExtensions: true
    }))

    const root = path.normalize(__dirname + './../')
    app.use(express.static(path.join(root, 'public')))

    log.end()
}

// exports.configure = configure
