'use strict'


export * as auth from "./auth";
export * as context from "./context";
export * as crypto from "./crypto";

// const fs = require('fs')
// const path = require('path')
// const files = fs.readdirSync(path.join(__dirname))

// for (let file of files) {
//     const fileName = file.split('.').slice(0, -1).join('.')
//     if (fileName && fileName !== 'index') {
//         module.exports[fileName] = require(`./${fileName}`)
//     }
// }
