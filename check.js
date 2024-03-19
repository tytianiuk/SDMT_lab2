'use strict'

const { STRINGS } = require('./strings')

const checkingRegExpes = (regExpesErr, text) => {
    for (const regExpErr of regExpesErr) {
        if (text.match(regExpErr) !== null) {
            const err = new Error(STRINGS.errRegExp)
            throw err
        }
    }
}

const checkingFormat = (outFile, mode) => {
    if (outFile) {
        if (mode) {
            return mode
        }
        return 'html'
    } else {
        if (mode) {
            return mode
        }
        return 'ansi'
    }
}

module.exports = { checkingFormat, checkingRegExpes }
