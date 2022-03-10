'use strict'

import jwt from "jsonwebtoken";
import config from "config";

// const jwt = require('jsonwebtoken')
const authConfig:any = config.get('auth')


export const getToken = (_id:string, isExpired:boolean, context:any) => {
    const log = context.logger.start(`permit/auth/getToken:${_id}`)
    try {
        const extractFrom = {
            _id: _id,
            // device: device
        }

        const options:any = {}

        if (isExpired) {
            options.expiresIn = '11h'
        }

        const token = jwt.sign(extractFrom, authConfig.jwtKey, options)
        
        log.end()
        return token
    } catch (err) {
        throw new Error(err)
    }

}

export const extractToken = (token:string, context:any) => {
    const log = context.logger.start(`permit/auth/requiresToken:${token}`)

    try {
        const decoded = jwt.verify(token, authConfig.jwtKey)
        log.end()
        return decoded
    } catch (err) {
        log.end()
        return err
    }
}

// exports.getToken = getToken
// exports.extractToken = extractToken
