import { formatDate } from '@/tools/date'

describe('formatDate', () => {
    it('returns empty string when date is undefined', () => {
        expect(formatDate(undefined)).toBe('')
    })

    it('returns empty string when date is an empty string', () => {
        expect(formatDate('')).toBe('')
    })

    it('formats a date string with a custom format', () => {
        const result = formatDate('2024-03-15', 'YYYY-MM-DD')
        expect(result).toBe('2024-03-15')
    })

    it('formats a date string to extract only the year', () => {
        const result = formatDate('2024-03-15', 'YYYY')
        expect(result).toBe('2024')
    })

    it('formats a unix timestamp number with a custom format', () => {
        // Use noon UTC to avoid timezone boundary issues on any machine
        const ts = new Date('2024-06-15T12:00:00.000Z').getTime()
        const result = formatDate(ts, 'YYYY')
        expect(result).toBe('2024')
    })

    it('uses default format when no format is provided', () => {
        // Default format is 'D MMM YYYY HH:mm:ss' with ru locale
        const result = formatDate('2024-03-15T12:00:00')
        // Should contain the year
        expect(result).toContain('2024')
    })

    it('formats date with time components', () => {
        const result = formatDate('2024-06-20T15:30:45', 'HH:mm:ss')
        expect(result).toBe('15:30:45')
    })

    it('formats date with day and month in Russian locale', () => {
        const result = formatDate('2024-01-05', 'D MMM YYYY')
        // With ru locale, January should be 'янв.'
        expect(result).toMatch(/5\s+\S+\s+2024/)
    })
})
