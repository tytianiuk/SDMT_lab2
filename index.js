'use strict'

const { readFile, writeFile } = require('./fileSystem.js')
const { convert } = require('./converter.js')
const { checkingFormat } = require('./check.js')

const main = () => {
    const argv = process.argv
    const inputFilePath = argv[2]
    let outputFilePath
    let mode
    if (argv.length > 3) {
        for (let i = 3; i < argv.length; i++) {
            const arg = argv[i]
            if (arg.startsWith('--out=')) outputFilePath = arg.split('=')[1]
            if (arg.startsWith('--format=')) mode = arg.split('=')[1]
        }
    }
    mode = checkingFormat(outputFilePath, mode)
    const data = readFile(inputFilePath)
    const convertedData = convert(data, mode)

    if (outputFilePath) {
        writeFile(outputFilePath, convertedData)
    } else {
        console.log(convertedData)
    }
}

main()
