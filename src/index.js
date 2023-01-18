const MORSE_TABLE = {
    '.-': 'a',
    '-...': 'b',
    '-.-.': 'c',
    '-..': 'd',
    '.': 'e',
    '..-.': 'f',
    '--.': 'g',
    '....': 'h',
    '..': 'i',
    '.---': 'j',
    '-.-': 'k',
    '.-..': 'l',
    '--': 'm',
    '-.': 'n',
    '---': 'o',
    '.--.': 'p',
    '--.-': 'q',
    '.-.': 'r',
    '...': 's',
    '-': 't',
    '..-': 'u',
    '...-': 'v',
    '.--': 'w',
    '-..-': 'x',
    '-.--': 'y',
    '--..': 'z',
    '.----': '1',
    '..---': '2',
    '...--': '3',
    '....-': '4',
    '.....': '5',
    '-....': '6',
    '--...': '7',
    '---..': '8',
    '----.': '9',
    '-----': '0',
};

function decode(expr) {
    if (!expr.includes('**********')) {
        let arr = []
        let start = 0
        let end = 10
        const count = 10

        for (let i = 0; i < expr.length; i++) {
            arr.push(expr.slice(start, end))
            start += count
            end += count
        }

        arr = arr.map(word => word
            .replace(/10/gi, '.')
            .replace(/11/gi, '-')
            .replace(/0/gi, ' ')
            .replace(/1/gi, ' ')
            .trim()
        )

        return arr.map(letter => MORSE_TABLE[letter]).join('')
    }

    return expr.split('**********')
        .map(word => word
            .replace(/11/gi, '-')
            .replace(/10/gi, '.')
            .replace(/0/gi, ' ')
            .replace(/1/gi, ' ')
            .trim()
            .split(' ')
            .filter(x => x !== '')
            .map(letter => {
                if (letter.length === 10) {
                    let first = letter.slice(0, 5)
                    let last = letter.slice(5, 10)
                    return MORSE_TABLE[first] + MORSE_TABLE[last]
                }
                return MORSE_TABLE[letter]
            }
            ).join('')).join(' ')
}

module.exports = {
    decode
}