'use strict'

const { checkingRegExpes } = require('./check')

const regExpes = [
    {
        regExp: /```(?=\r?\n)([\s\S]+?)(?<=\r?\n)```(?=\r?\n|$)/u,
        tags: ['<pre>', '</pre>'],
        symbol: '------',
        length: 3,
    },
    {
        regExp: /\*\*(?=\S).+?(?<=\S)\*\*(?=\s|$)/u,
        tags: ['<b>', '</b>'],
        length: 2,
    },
    {
        regExp: /_(?=\S).+?(?<=\S)_(?=\s|$)/u,
        tags: ['<i>', '</i>'],
        length: 1,
    },
    {
        regExp: /`(?=\S)(?!`).+?(?<=\S)`(?=\s|$)/u,
        tags: ['<tt>', '</tt>'],
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
]

const preData = []

const convert = (markdownText) => {
    for (const regExp of regExpes) {
        let textPart
        while ((textPart = markdownText.match(regExp.regExp)) != null) {
            const indexStart = textPart.index + regExp.length
            const indexEnd = textPart.index + textPart[0].length - regExp.length
            const formatedPart =
                regExp.tags[0] +
                markdownText.slice(indexStart, indexEnd) +
                regExp.tags[1]

            if (regExp.length === 3) {
                preData.push(formatedPart)
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
    return addParagraphs(addPre(markdownText, '------'))
}

const addParagraphs = (text) => {
    const paragraphs = text.split(/\r\n\r\n(?=.)/)

    const wrappedParagraphs = paragraphs.map(
        (paragraph) => `<p>${paragraph}</p>`,
    )

    return wrappedParagraphs.join('\n')
}

const addPre = (text, symbol) => {
    for (const tag of preData) {
        text = text.replace(symbol, tag)
    }
    return text
}

module.exports = { convert }