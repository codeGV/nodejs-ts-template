'use strict'

import * as response from "../exchange/response";
import { Response, Request, NextFunction } from "express";

export const canCreate = (req: Request, res: Response, next?: NextFunction) => {
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