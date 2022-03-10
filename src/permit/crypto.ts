'use strict'

const bcrypt = require('bcrypt')

export const getHash = (password:string, context:any) => {
    const log = context.logger.start('permit/crypto/getHash')
    const hash = bcrypt.hashSync(password, 10);
    log.end()
    return hash;
}

export const compareHash = (password:string, hash:string, context:any) => {
    const log = context.logger.start('permit/crypto/compareHash')
    if (bcrypt.compareSync(password, hash)) {
        log.end()

        return true
    }
    return false;
    // else {
    //     return false
    // }
    // log.end()
}


// exports.getHash = getHash
// exports.compareHash = compareHash
