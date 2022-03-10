'use strict'

import { Response, Request } from "express";
import * as response from "../exchange/response";
const service = require('../services/contactUs')

export const create = async (req: Request, res: Response) => {
    const context = (req as any).context
    const log = context?.logger.start(`api/contactUs`)
    try {
        const contactUs = await service.create(req.body, context)
        log.end()
        return response.data(res, contactUs)
    } catch (err) {
        log.error(err.message)
        log.end()
        return response.failure(res, err.message)
    }
}