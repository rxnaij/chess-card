/**
 * Returns the coresponding icon for a given time control/game type.
 * The returned icon should be rendered in the Lichess font.
 * @param name the name of the time control
 */
const getLichessIconChar = (name: string) => {
    const check = name.toLowerCase()
    switch (check) {
        case 'ultrabullet':
            return '{'
        case 'bullet':
            return 'T'
        case 'blitz':
            return ')'
        case 'rapid':
            return '#'
        case 'classical':
            return '+'
        case 'correspondence':
            return ';'
        case 'crazyhouse':
            return ''
        case 'chess960':
            return "'"
        case 'king of the hill':
            return '('
        case 'three-check':
            return '['
        case 'antichess':
            return '@'
        case 'atomic':
            return '>'
        case 'horde':
            return '_'
        case 'racing kings':
            return ''
        case 'puzzles':
            return '-'
        default:
            return ''
    }
}

export {getLichessIconChar}