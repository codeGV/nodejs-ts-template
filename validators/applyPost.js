'use strict'

const response = require('../exchange/response')

exports.canCreate = (req, res, next) => {
    if (!req.body.firstName) {
        response.failure(res, 'firstName is required')
    }
    if (!req.body.lastName) {
        response.failure(res, 'lastName is required')
    }
    if (!req.body.email) {
        response.failure(res, 'Email is required')
    }
    if (!req.body.phone) {
        response.failure(res, 'Phone is required')
    }
    if (!req.body.qualification) {
        response.failure(res, 'skills is required')
    }
    if (!req.body.collage) {
        response.failure(res, 'collage/university is required')
    }
    return next()

}