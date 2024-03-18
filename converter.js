'use strict'

const { checkingRegExpes } = require('./check')
const { STRINGS } = require('./strings')

const regExpes = [
    {
        regExp: /```(?=\r?\n)([\s\S]+?)(?<=\r?\n)```(?=\r?\n|$)/u,
        html: { tags: ['<pre>', '</pre>'] },
        ansi: { tags: ['\x1B[7m', '\x1B[27m'] },
        symbol: '------',
        length: 3,
    },
    {
        regExp: /\*\*(?=\S).+?(?<=\S)\*\*(?=\s|$)/u,
        html: { tags: ['<b>', '</b>'] },
        ansi: { tags: ['\x1B[1m', '\x1B[22m'] },
        length: 2,
    },
    {
        regExp: /_(?=\S).+?(?<=\S)_(?=\s|$)/u,
        html: { tags: ['<i>', '</i>'] },
        ansi: { tags: ['\x1B[3m', '\x1B[23m'] },
        length: 1,
    },
    {
        regExp: /`(?=\S)(?!`).+?(?<=\S)`(?=\s|$)/u,
        html: { tags: ['<tt>', '</tt>'] },
        ansi: { tags: ['\x1B[7m', '\x1B[27m'] },
        length: 1,
    },
]

const regExpesErr = [
    /(^|\s)\*\*([\w\u0400-\u04FF])+/u,
    /(^|\s)_([\w\u0400-\u04FF])+/u,
    /(^|\s)`([\w\u0400-\u04FF])+/u,
    /(^|\s|)```([\w\u0400-\u04FF])+/u,
    /(^|\s|)```(?=\r?\n|$|\s)/u,
    /\*\*[_|`]/,
    /[_|`]\*\*/,
    /_`/,
    /`_/,
]

const regExpesNesting = [
    /<i>((.*?)?<\/?(b|tt)>(.*?)?)<\/i>/,
    /<b>((.*?)?<\/?(i|tt)>(.*?)?)<\/b>/,
    /<tt>((.*?)?<\/?(b|i)>(.*?)?)<\/tt>/,
    /<b>_(.*?)_<\/b>/,
    /<b>`(.*?)`<\/b>/,
]

const preData = []

const modes = ['html', 'ansi']

const convert = (markdownText, mode) => {
    for (const regExp of regExpes) {
        checkMode(mode)
        let textPart
        while ((textPart = markdownText.match(regExp.regExp)) != null) {
            const indexStart = textPart.index + regExp.length
            const indexEnd = textPart.index + textPart[0].length - regExp.length
            const formatedPart =
                regExp[mode].tags[0] +
                markdownText.slice(indexStart, indexEnd) +
                regExp[mode].tags[1]

            if (regExp.length === 3) {
                mode === 'html'
                    ? preData.push(formatedPart)
                    : preData.push(
                          formatedPart.replace('\r\n\x1B[27m', '\x1B[27m'),
                      )
                markdownText = markdownText.replace(
                    regExp.regExp,
                    regExp.symbol,
                )
                continue
            }
            markdownText = markdownText.replace(regExp.regExp, formatedPart)
        }
    }

    checkingRegExpes(regExpesErr, markdownText)
    checkingRegExpes(regExpesNesting, markdownText)
    markdownText = addPre(markdownText, '------')
    console.log(preData)
    if (mode === 'html') return addParagraphs(markdownText)
    return markdownText
}

const addParagraphs = (text) => {
    const paragraphs = text.split(/\r\n\r\n(?=.)/)

    const wrappedParagraphs = paragraphs.map(
        (paragraph) => `<p>${paragraph}</p>`,
    )

    return wrappedParagraphs.join('\r\n')
}

const addPre = (text, symbol) => {
    for (const tag of preData) {
        text = text.replace(symbol, tag)
    }
    return text
}

const checkMode = (mode) => {
    if (!modes.includes(mode)) {
        const err = new Error(STRINGS.errInvMode)
        throw err
    }
}

module.exports = { convert }
