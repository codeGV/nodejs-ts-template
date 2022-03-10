'use strict'
import * as auth from "./auth";
import * as response from "../exchange/response";
import { Response, Request, NextFunction } from "express";  

const logger = require('@open-age/logger')('permit:context:builder')

var db:any;

export const builder = (req: Request, res: Response, next?: NextFunction) => {
    const context: any = {
        logger: logger,
    };

    (req as any).context = context
    if (next) {
        return next()
    }
    return null
}

export const validateToken = (req: Request, res: Response) => {
    builder(req, res)
    const log = (req as any)?.context.logger.start(`permit/auth/validateToken`)
    try {
        const token = <string> req.headers['x-access-token']

        if (!token) {
            log.end()
            return response.failure(res, 'token is required')
        }

        const details = auth.extractToken(token, (req as any)?.context)

        if (details.name === 'TokenExpiredError') {
            log.end()
            return response.failure(res, 'token expired')
        }

        if (details.name === 'JsonWebTokenError') {
            log.end()
            return response.failure(res, 'token is invalid')
        }
        log.end()

        return response.success(res, 'token is valid')
    } catch (err) {
        throw new Error(err)
    }
}

export const requiresToken = async (req: Request, res: Response, next?: NextFunction) => {
    builder(req, res)
    const log = (req as any)?.context.logger.start(`permit/auth/requiresToken`)
    try {
        const token = <string> req.headers['x-access-token']

        if (!token) {
            log.end()
            return response.failure(res, 'token is required')
        }

        const decodedUser = auth.extractToken(token, (req as any)?.context)

        const user = await db.user.findById(decodedUser._id)
        if (user) {

            if (user.token === '' || user.token === null || user.token === undefined) {
                return response.failure(res, 'token doesnot exist,maybe token is changed So, Try login again first.')
            }
            if ((user.token !== token)) {
                log.end()
                return response.unAuthorized(res, 'unAuthorized User')
            }

            (req as any).context.user = user
            log.end()
            return next()
        }
        return response.unAuthorized(res, 'invalid token')
    } catch (err) {
        log.end()
        throw new Error(err)
    }
}








// if (req.url == "/api/users/verifyRegOtp") {
//     if ((user.regToken !== token)) {
//         log.end()
//         return response.unAuthorized(res, 'invalid token to authorized user')
//     }
// } else if (req.url == "/api/users/verifyOtp") {
//     if ((user.tempToken !== token)) {
//         log.end()
//         return response.unAuthorized(res, 'invalid token ')
//     }
// } else {
//     if (user.token === '' || user.token === null || user.token === undefined) {
//         return response.failure(res, 'token doesnot exist,maybe token is changed So, Try login again first.')
//     }
//     if ((user.token !== token)) {
//         log.end()
//         return response.unAuthorized(res, 'unAuthorized User')
//     }
// }
