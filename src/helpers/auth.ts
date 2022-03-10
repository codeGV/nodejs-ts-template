'use strict'

const logger = require('@open-age/logger')('helper/auth')
const context = require('./context-builder')
import * as response from "../exchange/response";
import { Response, Request, NextFunction } from "express";



exports.requireGuest = (req: Request, res: Response, next?: NextFunction) => {

    context.create({}, logger).then((context:any) => {
        (req as any).context = context
        next()
    }).catch((err:any) => {
        response.unAuthorized(res, 'internal server error')
    })
}

