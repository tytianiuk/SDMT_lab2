const { convert } = require('../converter')
const { STRINGS } = require('../strings')

describe('Checking paragraphs:', () => {
    test('with one paragraph', () => {
        expect(convert('paragraph')).toBe('<p>paragraph</p>')
    })

    test('with two paragraphs', () => {
        expect(convert('paragraph\r\n\r\nparagraph')).toBe(
            '<p>paragraph</p>\r\n<p>paragraph</p>',
        )
    })
})

describe('Checking bold tags:', () => {
    test('with common tags', () => {
        expect(convert('**bold**')).toBe('<p><b>bold</b></p>')
    })

    test('with just symbol', () => {
        expect(convert('**')).toBe('<p>**</p>')
    })

    test('with just symbol in tags', () => {
        expect(convert('**bold ** bold**')).toBe('<p><b>bold ** bold</b></p>')
    })

    test('with just symbol in word in tags', () => {
        expect(convert('**bold**bold**')).toBe('<p><b>bold**bold</b></p>')
    })
})

describe('Checking italic tags:', () => {
    test('with common tags', () => {
        expect(convert('_italic_')).toBe('<p><i>italic</i></p>')
    })

    test('with just symbol', () => {
        expect(convert('_')).toBe('<p>_</p>')
    })

    test('with just symbol in tags', () => {
        expect(convert('_italic _ italic_')).toBe(
            '<p><i>italic _ italic</i></p>',
        )
    })

    test('with just symbol in word in tags', () => {
        expect(convert('_italic_italic_')).toBe('<p><i>italic_italic</i></p>')
    })
})

describe('Checking monospaced tags:', () => {
    test('with common tags', () => {
        expect(convert('`monospaced`')).toBe('<p><tt>monospaced</tt></p>')
    })

    test('with just symbol', () => {
        expect(convert('`')).toBe('<p>`</p>')
    })

    test('with just symbol in tags', () => {
        expect(convert('`monospaced ` monospaced`')).toBe(
            '<p><tt>monospaced ` monospaced</tt></p>',
        )
    })

    test('with just symbol in word in tags', () => {
        expect(convert('`monospaced`monospaced`')).toBe(
            '<p><tt>monospaced`monospaced</tt></p>',
        )
    })
})

describe('Checking preformatted tags:', () => {
    test('with another tags', () => {
        expect(convert('```\r\n**bold** and _italic_\r\n```')).toBe(
            '<p><pre>\r\n**bold** and _italic_\r\n</pre></p>',
        )
    })
})

describe('Errors', () => {
    test('with nesting tag', () => {
        expect(() => convert('**_This is invalid_**')).toThrow(
            STRINGS.errRegExp,
        )
    })

    test('with nesting tags', () => {
        expect(() => convert('**This _is_ invalid**')).toThrow(
            STRINGS.errRegExp,
        )
    })

    test('with open tag', () => {
        expect(() => convert('**hello')).toThrow(STRINGS.errRegExp)
    })

    test('with text after preformatted tag', () => {
        expect(() => convert('```hello')).toThrow(STRINGS.errRegExp)
    })
})