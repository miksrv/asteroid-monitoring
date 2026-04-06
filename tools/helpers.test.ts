import { formatDistance } from '@/tools/helpers'

describe('formatDistance', () => {
    it('formats a positive integer distance with comma separators', () => {
        expect(formatDistance(1234567)).toBe('1,234,567')
    })

    it('rounds a float distance to the nearest integer', () => {
        expect(formatDistance(1234567.89)).toBe('1,234,568')
    })

    it('rounds down correctly', () => {
        expect(formatDistance(999.4)).toBe('999')
    })

    it('returns empty string when distance is undefined', () => {
        expect(formatDistance(undefined)).toBe('')
    })

    it('returns empty string when distance is 0 (falsy)', () => {
        expect(formatDistance(0)).toBe('')
    })

    it('formats a small distance without separators', () => {
        expect(formatDistance(500)).toBe('500')
    })

    it('formats a very large distance', () => {
        expect(formatDistance(100000000)).toBe('100,000,000')
    })
})
