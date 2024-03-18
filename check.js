'use strict'

const { STRINGS } = require('./strings')

const checkingArgs = (inputFilePath, outputFlagIndex, outputFilePath) => {
    if (process.argv.length === 3) {
        if (!inputFilePath.includes('.md')) {
            const err = new Error(STRINGS.errThreeArgs)
            throw err
        }
    } else if (process.argv.length === 5) {
        if (!outputFilePath.includes('.html') || outputFlagIndex !== 1) {
            const err = new Error(STRINGS.errFiveArgs)
            throw err
        }
    } else {
        const err = new Error(STRINGS.errArgs)
        throw err
    }
}

const checkingRegExpes = (regExpesErr, text) => {
    for (const regExpErr of regExpesErr) {
        if (text.match(regExpErr) !== null) {
            const err = new Error(STRINGS.errRegExp)
            throw err
        }
    }
}

module.exports = { checkingArgs, checkingRegExpes }
