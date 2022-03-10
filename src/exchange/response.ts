'use strict'
import { Response } from "express";

export const success = (res: Response, message:string) => {
    res.status(200)
        .json({
            isSuccess: true,
            statusCode: 200,
            data: message
        })
}

export const failure = (res: Response, message:string) => {
    res.status(400)
        .json({
            isSuccess: false,
            statusCode: 400,
            error: message
        })
}

export const unAuthorized = (res: Response, message:string) => {
    res.status(401)
        .json({
            isSuccess: false,
            statusCode: 401,
            error: message
        })
}

export const data = (res: Response, data:any) => {
    res.status(200)
        .json({
            isSuccess: true,
            statusCode: 200,
            data: data,
            message: res.statusMessage
        })
}

export const page = (res: Response, data:any, pageNo:number, pageSize:number, total:number) => {
    res.status(200)
        .json({
            isSuccess: true,
            statusCode: 200,
            pageNo: pageNo,
            pageSize: pageSize,
            total: total,
            items: data
        })
}

export const authorized = (res: Response, data:any, token:string) => {
    res.status(200)
        .set('x-access-token', token)
        .json({
            isSuccess: true,
            statusCode: 200,
            data: data
        })
}
