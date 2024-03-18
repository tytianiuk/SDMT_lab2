'use strict'

const STRINGS = {
    errThreeArgs: 'Error: use "node index.js path/to/file.md"',
    errFiveArgs:
        'Error: use "node index.js path/to/file.md --out path/to/file.html"',
    errArgs: 'Error: check number of arguments.',
    errRegExp: 'Error: invalid markdown.',
}

module.exports = { STRINGS }
