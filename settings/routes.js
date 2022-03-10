'use strict'

const fs = require('fs')
const specs = require('../specs')
const api = require('../api')
var auth = require('../permit')
const validator = require('../validators')


const configure = (app, logger) => {
    const log = logger.start('settings:routes:configure')

    app.get('/specs', function (req, res) {
        fs.readFile('./public/specs.html', function (err, data) {
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

    app.get('/api/specs', function (req, res) {
        res.contentType('application/json')
        res.send(specs.get())
    })

    // .......................................contactUs routes.......................................
    app.post('/api/contactUs', auth.context.builder, validator.contactUs.canCreate, api.contactUs.create)


    log.end()
}
exports.configure = configure