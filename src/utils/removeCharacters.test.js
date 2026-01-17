import { describe, it, expect } from 'vitest'
import { removeCharacters } from './removeCharacters'

describe('removeCharacters', () => {
    describe('individual mode (consecutiveOnly = false)', () => {
        it('should remove single character from text', () => {
            const { result, removedCount } = removeCharacters('hello\\world', ['\\'], false)
            expect(result).toBe('helloworld')
            expect(removedCount).toBe(1)
        })

        it('should remove multiple different characters', () => {
            const { result, removedCount } = removeCharacters('he"llo\'world', ['"', "'"], false)
            expect(result).toBe('helloworld')
            expect(removedCount).toBe(2)
        })

        it('should remove all occurrences of a character', () => {
            const { result, removedCount } = removeCharacters('a\\b\\c\\d', ['\\'], false)
            expect(result).toBe('abcd')
            expect(removedCount).toBe(3)
        })

        it('should handle empty text', () => {
            const { result, removedCount } = removeCharacters('', ['\\'], false)
            expect(result).toBe('')
            expect(removedCount).toBe(0)
        })

        it('should handle empty characters array', () => {
            const { result, removedCount } = removeCharacters('hello', [], false)
            expect(result).toBe('hello')
            expect(removedCount).toBe(0)
        })

        it('should handle special regex characters', () => {
            const { result, removedCount } = removeCharacters('test.value*here', ['.', '*'], false)
            expect(result).toBe('testvaluehere')
            expect(removedCount).toBe(2)
        })
    })

    describe('consecutive mode (consecutiveOnly = true)', () => {
        it('should remove consecutive occurrences only', () => {
            // Input: a + 2 backslashes + b + 1 backslash + c
            // Expected: 2 consecutive backslashes removed, single backslash remains
            const { result, removedCount } = removeCharacters('a\\\\b\\c', ['\\'], true)
            expect(result).toBe('ab\\c')
            expect(removedCount).toBe(2)
        })

        it('should not remove single occurrences', () => {
            const { result, removedCount } = removeCharacters('a\\b\\c\\d', ['\\'], true)
            expect(result).toBe('a\\b\\c\\d')
            expect(removedCount).toBe(0)
        })

        it('should remove multiple consecutive groups', () => {
            const { result, removedCount } = removeCharacters('a\\\\\\b\\\\c', ['\\'], true)
            expect(result).toBe('abc')
            expect(removedCount).toBe(5)
        })

        it('should handle multiple characters in consecutive mode', () => {
            const { result, removedCount } = removeCharacters('a""b\'\'c', ['"', "'"], true)
            expect(result).toBe('abc')
            expect(removedCount).toBe(4)
        })
    })

    describe('edge cases', () => {
        it('should handle null text', () => {
            const { result, removedCount } = removeCharacters(null, ['\\'], false)
            expect(result).toBe('')
            expect(removedCount).toBe(0)
        })

        it('should handle undefined text', () => {
            const { result, removedCount } = removeCharacters(undefined, ['\\'], false)
            expect(result).toBe('')
            expect(removedCount).toBe(0)
        })

        it('should handle newline character', () => {
            const { result, removedCount } = removeCharacters('hello\nworld\n', ['\n'], false)
            expect(result).toBe('helloworld')
            expect(removedCount).toBe(2)
        })

        it('should handle tab character', () => {
            const { result, removedCount } = removeCharacters('hello\tworld', ['\t'], false)
            expect(result).toBe('helloworld')
            expect(removedCount).toBe(1)
        })
    })
})
