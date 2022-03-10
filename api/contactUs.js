'use strict'

const response = require('../exchange/response')
const service = require('../services/contactUs')

exports.create = async (req, res) => {
    const log = req.context.logger.start(`api/contactUs`)
    try {
        const contactUs = await service.create(req.body, req.context)
        log.end()
        return response.data(res, contactUs)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}