'use strict'

const fs = require('node:fs')

const readFile = (path) => {
    return fs.readFileSync(path, 'utf8')
}

const writeFile = (path, data) => {
    fs.writeFileSync(path, data)
}

module.exports = { readFile, writeFile }