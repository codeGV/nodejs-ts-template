'use strict'

const response = require('../exchange/response')

exports.canCreate = (req, res, next) => {
    if (!req.body.name) {
        response.failure(res, 'Name is required')
    }
    if (!req.body.email) {
        response.failure(res, 'Email is required')
    }
    if (!req.body.phone) {
        response.failure(res, 'Phone is required')
    }
    if (!req.body.queryFor) {
        response.failure(res, 'queryFor is required')
    }
    if (!req.body.message) {
        response.failure(res, 'message is required')
    }
    return next()

}