'use strict'

const { readFile, writeFile } = require('./fileSystem.js')
const { checkingArgs } = require('./check.js')
const { convert } = require('./converter.js')

const main = () => {
    const args = process.argv.slice(2)
    const inputFilePath = args[0]
    const outputFlagIndex = args.indexOf('--out')
    const outputFilePath = outputFlagIndex === 1 ? args[outputFlagIndex + 1] : 0

    checkingArgs(inputFilePath, outputFlagIndex, outputFilePath)

    const data = readFile(inputFilePath)
    const html = convert(data)

    if (outputFilePath) {
        writeFile(outputFilePath, html)
    } else {
        console.log(html)
    }
}

main()
