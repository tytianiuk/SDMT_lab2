const { convert } = require('../converter')
const { STRINGS } = require('../strings')

const testing = (mode, tests) => {
    for (const [description, categories] of Object.entries(tests)) {
        describe(description, () => {
            for (const [category, valueTest] of Object.entries(categories)) {
                test(category, () => {
                    expect(convert(valueTest.input, mode)).toBe(
                        valueTest.output,
                    )
                })
            }
        })
    }
}

describe('HTML', () => {
    const tests = {
        'Checking paragraphs:': {
            'with one paragraph': {
                input: 'paragraph',
                output: '<p>paragraph</p>',
            },
            'with two paragraphs': {
                input: 'paragraph\r\n\r\nparagraph',
                output: '<p>paragraph</p>\r\n<p>paragraph</p>',
            },
        },
        'Checking bold tags:': {
            'with common tags': {
                input: '**bold**',
                output: '<p><b>bold</b></p>',
            },
            'with just symbol': {
                input: '**',
                output: '<p>**</p>',
            },
            'with just symbol in tags': {
                input: '**bold ** bold**',
                output: '<p><b>bold ** bold</b></p>',
            },
            'with just symbol in word in tags': {
                input: '**bold**bold**',
                output: '<p><b>bold**bold</b></p>',
            },
        },
        'Checking italic tags:': {
            'with common tags': {
                input: '_italic_',
                output: '<p><i>italic</i></p>',
            },
            'with just symbol': {
                input: '_',
                output: '<p>_</p>',
            },
            'with just symbol in tags': {
                input: '_italic _ italic_',
                output: '<p><i>italic _ italic</i></p>',
            },
            'with just symbol in word in tags': {
                input: '_italic_italic_',
                output: '<p><i>italic_italic</i></p>',
            },
        },
        'Checking monospaced tags:': {
            'with common tags': {
                input: '`monospaced`',
                output: '<p><tt>monospaced</tt></p>',
            },
            'with just symbol': {
                input: '`',
                output: '<p>`</p>',
            },
            'with just symbol in tags': {
                input: '`monospaced ` monospaced`',
                output: '<p><tt>monospaced ` monospaced</tt></p>',
            },
            'with just symbol in word in tags': {
                input: '`monospaced`monospaced`',
                output: '<p><tt>monospaced`monospaced</tt></p>',
            },
        },
    }
    testing('html', tests)
})

describe('ANSI', () => {
    const tests = {
        'Checking bold tags:': {
            'with common tags': {
                input: '**bold**',
                output: '\x1B[1mbold\x1B[22m',
            },
            'with just symbol': {
                input: '**',
                output: '**',
            },
            'with just symbol in tags': {
                input: '**bold ** bold**',
                output: '\x1B[1mbold ** bold\x1B[22m',
            },
            'with just symbol in word in tags': {
                input: '**bold**bold**',
                output: '\x1B[1mbold**bold\x1B[22m',
            },
        },
        'Checking italic tags:': {
            'with common tags': {
                input: '_italic_',
                output: '\x1B[3mitalic\x1B[23m',
            },
            'with just symbol': {
                input: '_',
                output: '_',
            },
            'with just symbol in tags': {
                input: '_italic _ italic_',
                output: '\x1B[3mitalic _ italic\x1B[23m',
            },
            'with just symbol in word in tags': {
                input: '_italic_italic_',
                output: '\x1B[3mitalic_italic\x1B[23m',
            },
        },
        'Checking monospaced tags:': {
            'with common tags': {
                input: '`monospaced`',
                output: '\x1B[7mmonospaced\x1B[27m',
            },
            'with just symbol': {
                input: '`',
                output: '`',
            },
            'with just symbol in tags': {
                input: '`monospaced ` monospaced`',
                output: '\x1B[7mmonospaced ` monospaced\x1B[27m',
            },
            'with just symbol in word in tags': {
                input: '`monospaced`monospaced`',
                output: '\x1B[7mmonospaced`monospaced\x1B[27m',
            },
        },
        'Checking tags:': {
            'with another tags': {
                input: '```\r\n**bold** and _italic_\r\n```',
                output: '\x1B[7m\r\n**bold** and _italic_\x1B[27m',
            },
        },
    }
    testing('ansi', tests)
})

describe('Errors', () => {
    test('with nesting tag', () => {
        expect(() => convert('**_This is invalid_**', 'html')).toThrow(
            STRINGS.errRegExp,
        )
    })

    test('with nesting tags', () => {
        expect(() => convert('**This _is_ invalid**', 'html')).toThrow(
            STRINGS.errRegExp,
        )
    })

    test('with open tag', () => {
        expect(() => convert('**hello', 'html')).toThrow(STRINGS.errRegExp)
    })

    test('with text after preformatted tag', () => {
        expect(() => convert('```hello', 'html')).toThrow(STRINGS.errRegExp)
    })
})
