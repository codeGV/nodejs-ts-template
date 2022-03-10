'use strict'
import mongoose from "mongoose";
import { Response, Request, NextFunction } from "express";

// module.exports = {
//     name: {
//         type: String,
//         lowercase: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         lowercase: true,
//         trim: true
//     },
//     phone: String,
//     queryFor: String,
//     message: String
// }

export type UserDocument = mongoose.Document & {
    name: string,
    email: string,
    phone: string,
    queryFor: string,
    message: string
};

const userSchema = new mongoose.Schema<UserDocument>(
    {
        name: {
            type: String,
            lowercase: true,
            trim: true
        },
        email: {
            type: String,
            lowercase: true,
            trim: true
        },
        phone: String,
        queryFor: String,
        message: String
    },
    { timestamps: true },
);

userSchema.pre('save', function (next:NextFunction) {
    // this.timeStamp = Date.now()
    next()
})

export const User = mongoose.model<UserDocument>("contactUs", userSchema);
