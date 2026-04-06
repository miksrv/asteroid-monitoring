import { useEffect, useState } from 'react'

export const useLocalStorage = <T>(key: string, initialValue?: T) => {
    const [storedValue, setStoredValue] = useState<T | undefined>()

    useEffect(() => {
        const value = window.localStorage.getItem(key)

        if (value) {
            try {
                setStoredValue(JSON.parse(value) as T)
            } catch (error) {
                console.error(error)
                setStoredValue(initialValue)
            }
        } else {
            setStoredValue(initialValue)
        }
    }, [key])

    const setValue = (value: T) => {
        setStoredValue(value)
        window.localStorage.setItem(key, JSON.stringify(value))
    }

    return [storedValue as T, setValue] as const
}
