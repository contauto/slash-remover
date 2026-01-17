/**
 * Removes specified characters from text
 * @param {string} text - Input text
 * @param {string[]} chars - Characters to remove
 * @param {boolean} consecutiveOnly - If true, only remove when characters appear consecutively
 * @returns {{ result: string, removedCount: number }}
 */
export const removeCharacters = (text, chars, consecutiveOnly = false) => {
    if (!text || !chars || chars.length === 0) {
        return { result: text || '', removedCount: 0 }
    }

    let result = text
    let removedCount = 0

    if (consecutiveOnly) {
        // Remove only consecutive occurrences of the characters
        for (const char of chars) {
            const escapedChar = escapeRegExp(char)
            // Match 2 or more consecutive occurrences
            const regex = new RegExp(`(${escapedChar}){2,}`, 'g')
            const matches = result.match(regex)
            if (matches) {
                for (const match of matches) {
                    removedCount += match.length
                }
            }
            result = result.replace(regex, '')
        }
    } else {
        // Remove all occurrences
        for (const char of chars) {
            const escapedChar = escapeRegExp(char)
            const regex = new RegExp(escapedChar, 'g')
            const matches = result.match(regex)
            if (matches) {
                removedCount += matches.length
            }
            result = result.replace(regex, '')
        }
    }

    return { result, removedCount }
}

/**
 * Escapes special regex characters in a string
 * @param {string} string - The string to escape
 * @returns {string} - Escaped string safe for use in RegExp
 */
const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export default removeCharacters
