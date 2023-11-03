import '@testing-library/jest-dom'
import { act, renderHook } from '@testing-library/react-hooks'

import { useLocalStorage } from './hooks'

describe('useLocalStorage', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('should return initial value when localStorage is empty', () => {
        const { result } = renderHook(() => useLocalStorage('testKey', 42))
        const [value] = result.current

        expect(value).toBe(42)
    })

    it('should return stored value from localStorage', () => {
        localStorage.setItem('testKey', JSON.stringify(99))

        const { result } = renderHook(() => useLocalStorage('testKey', 42))
        const [value] = result.current

        expect(value).toBe(99)
    })

    it('should update value and store it in localStorage', () => {
        const { result } = renderHook(() => useLocalStorage('testKey', 42))
        const [, setValue] = result.current

        act(() => {
            setValue(66)
        })

        const [value] = result.current
        const storedValue = JSON.parse(
            localStorage.getItem('testKey') || 'null'
        )

        expect(value).toBe(66)
        expect(storedValue).toBe(66)
    })

    it('should handle invalid JSON data in localStorage', () => {
        localStorage.setItem('testKey', 'invalid-json')

        const { result } = renderHook(() => useLocalStorage('testKey', 42))
        const [value] = result.current

        expect(value).toBe(42)
    })
})
