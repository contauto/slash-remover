/**
 * Removes empty lines from text
 * @param {string} text - Input text
 * @param {string} mode - 'all' removes all empty lines, 'collapse' keeps one empty line
 * @returns {{ result: string, removedCount: number }}
 */
export const removeEmptyLines = (text, mode = 'all') => {
    if (!text) {
        return { result: text || '', removedCount: 0 }
    }

    const lines = text.split('\n')
    const originalLength = lines.length
    let result = []
    let removedCount = 0

    if (mode === 'all') {
        // Remove all empty lines
        result = lines.filter(line => line.trim() !== '')
        removedCount = originalLength - result.length
    } else if (mode === 'collapse') {
        // Collapse multiple empty lines into one
        let prevWasEmpty = false
        for (const line of lines) {
            const isEmpty = line.trim() === ''
            if (isEmpty) {
                if (!prevWasEmpty) {
                    result.push(line)
                } else {
                    removedCount++
                }
                prevWasEmpty = true
            } else {
                result.push(line)
                prevWasEmpty = false
            }
        }
    }

    return { result: result.join('\n'), removedCount }
}

export default removeEmptyLines
