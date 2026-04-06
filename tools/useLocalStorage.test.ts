import { act, renderHook } from '@testing-library/react'

import { useLocalStorage } from '@/tools/useLocalStorage'

const TEST_KEY = 'test-key'

describe('useLocalStorage', () => {
    beforeEach(() => {
        localStorage.clear()
        jest.clearAllMocks()
    })

    it('returns initialValue when localStorage has no value for the key', () => {
        const { result } = renderHook(() => useLocalStorage(TEST_KEY, 'default'))
        // After useEffect runs, storedValue should be set to initialValue
        expect(result.current[0]).toBe('default')
    })

    it('returns parsed value from localStorage when key exists', () => {
        localStorage.setItem(TEST_KEY, JSON.stringify('stored-value'))
        const { result } = renderHook(() => useLocalStorage(TEST_KEY, 'default'))
        expect(result.current[0]).toBe('stored-value')
    })

    it('returns parsed object from localStorage', () => {
        const obj = { count: 5, name: 'asteroid' }
        localStorage.setItem(TEST_KEY, JSON.stringify(obj))
        const { result } = renderHook(() => useLocalStorage<typeof obj>(TEST_KEY))
        expect(result.current[0]).toStrictEqual(obj)
    })

    it('updates storedValue when setStoredValue is called', () => {
        const { result } = renderHook(() => useLocalStorage<string>(TEST_KEY, 'initial'))

        act(() => {
            result.current[1]('updated')
        })

        expect(result.current[0]).toBe('updated')
    })

    it('persists value to localStorage when storedValue changes', () => {
        const { result } = renderHook(() => useLocalStorage<string>(TEST_KEY, 'initial'))

        act(() => {
            result.current[1]('persisted')
        })

        const stored = localStorage.getItem(TEST_KEY)
        expect(stored).toBe(JSON.stringify('persisted'))
    })

    it('falls back to initialValue when localStorage value is invalid JSON', () => {
        localStorage.setItem(TEST_KEY, 'not-valid-json{{{')
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

        const { result } = renderHook(() => useLocalStorage(TEST_KEY, 'fallback'))

        expect(result.current[0]).toBe('fallback')
        expect(consoleErrorSpy).toHaveBeenCalled()
        consoleErrorSpy.mockRestore()
    })

    it('returns undefined as initial value when no initialValue is provided and key is absent', () => {
        const { result } = renderHook(() => useLocalStorage(TEST_KEY))
        expect(result.current[0]).toBeUndefined()
    })

    it('works with numeric values', () => {
        localStorage.setItem(TEST_KEY, JSON.stringify(42))
        const { result } = renderHook(() => useLocalStorage<number>(TEST_KEY, 0))
        expect(result.current[0]).toBe(42)
    })

    it('works with array values', () => {
        const arr = [1, 2, 3]
        localStorage.setItem(TEST_KEY, JSON.stringify(arr))
        const { result } = renderHook(() => useLocalStorage<number[]>(TEST_KEY, []))
        expect(result.current[0]).toStrictEqual([1, 2, 3])
    })

    it('returns a setter function as the second element', () => {
        const { result } = renderHook(() => useLocalStorage<string>(TEST_KEY))
        expect(typeof result.current[1]).toBe('function')
    })
})
