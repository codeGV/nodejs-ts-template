'use strict'

const fs = require('fs')
// import * as specs from '../specs';
import * as api from '../api';
import * as auth from '../permit';
import * as validator from '../validators';
import express from "express";

// const specs = require('../specs')
// const api = require('../api')
// var auth = require('../permit')
// const validator = require('../validators')


const configure = (app:express.Express, logger:any) => {
    const log = logger.start('settings:routes:configure')

    app.get('/specs', function (req, res) {
        fs.readFile('./public/specs.html', function (err:any, data:any) {
            if (err) {
                return res.json({
                    isSuccess: false,
                    error: err.toString()
                })
            }
            res.contentType('text/html')
            res.send(data)
        })
    })

    // app.get('/api/specs', function (req, res) {
    //     res.contentType('application/json')
    //     res.send(specs.get())
    // })

    // .......................................contactUs routes.......................................
    app.post('/api/contactUs', auth.context.builder, validator.contactUs.canCreate, api.contactUs.create)


    log.end()
}
exports.configure = configure