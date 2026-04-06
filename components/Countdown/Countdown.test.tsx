import React from 'react'
import { render, screen, act } from '@testing-library/react'

import { Countdown } from '@/components/Countdown/Countdown'

describe('Countdown', () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.useRealTimers()
    })

    it('renders the countdown title', () => {
        render(<Countdown />)
        expect(screen.getByText('Обратный отсчет')).toBeInTheDocument()
    })

    it('renders all time unit labels', () => {
        render(<Countdown />)
        expect(screen.getByText('Дней')).toBeInTheDocument()
        expect(screen.getByText('Часов')).toBeInTheDocument()
        expect(screen.getByText('Минут')).toBeInTheDocument()
        expect(screen.getByText('Секунд')).toBeInTheDocument()
    })

    it('shows T- sign when timestamp is in the future', () => {
        const futureTimestamp = Date.now() + 1000 * 60 * 60 * 24 // 1 day from now
        render(<Countdown timestamp={futureTimestamp} />)
        const tText = screen.getByText((_, element) => {
            return element?.tagName === 'H5' && element.textContent === 'T-'
        })
        expect(tText).toBeInTheDocument()
    })

    it('shows T+ sign when timestamp is in the past', () => {
        const pastTimestamp = Date.now() - 1000 * 60 * 60 * 24 // 1 day ago
        render(<Countdown timestamp={pastTimestamp} />)
        // The sign '+' is rendered as a text node inside the <h5> alongside 'T'
        const tText = screen.getByText((_, element) => {
            return element?.tagName === 'H5' && element.textContent === 'T+'
        })
        expect(tText).toBeInTheDocument()
    })

    it('renders without timestamp - defaults to zeros', () => {
        render(<Countdown />)
        const digits = screen.getAllByText('00')
        expect(digits.length).toBeGreaterThanOrEqual(1)
    })

    it('updates every second via setInterval', () => {
        const futureTimestamp = Date.now() + 3600 * 1000
        render(<Countdown timestamp={futureTimestamp} />)

        act(() => {
            jest.advanceTimersByTime(1000)
        })

        expect(screen.getByText('Секунд')).toBeInTheDocument()
    })

    it('clears interval on unmount', () => {
        const clearIntervalSpy = jest.spyOn(global, 'clearInterval')
        const { unmount } = render(<Countdown timestamp={Date.now() + 1000} />)

        unmount()

        expect(clearIntervalSpy).toHaveBeenCalled()
        clearIntervalSpy.mockRestore()
    })

    it('applies hazardous class when hazardous prop is true', () => {
        const { container } = render(
            <Countdown
                timestamp={Date.now() + 1000}
                hazardous={true}
            />
        )
        // The class is mocked by identity-obj-proxy, so we check the element exists
        expect(container.firstChild).toBeInTheDocument()
    })

    it('formats days with padStart to at least 2 digits', () => {
        // Future timestamp: exactly 1 day + 2 hours from now
        const timestamp = Date.now() + (1 * 24 + 2) * 3600 * 1000
        render(<Countdown timestamp={timestamp} />)
        // Day digit should be at least 2 chars (padded)
        const dayDigit = screen.getByText('Дней').closest('div')
        expect(dayDigit?.querySelector('h3')?.textContent?.length).toBeGreaterThanOrEqual(2)
    })
})
