import React from 'react'

import { render, screen } from '@testing-library/react'

import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary'

const ThrowingComponent = () => {
    throw new Error('Test error')
}

describe('ErrorBoundary', () => {
    // Suppress console.error output from intentional throws
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {})
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    it('renders children when there is no error', () => {
        render(
            <ErrorBoundary fallback={<div>{'Error fallback'}</div>}>
                <div>{'Normal content'}</div>
            </ErrorBoundary>
        )

        expect(screen.getByText('Normal content')).toBeInTheDocument()
        expect(screen.queryByText('Error fallback')).toBeNull()
    })

    it('renders fallback when a child throws', () => {
        render(
            <ErrorBoundary fallback={<div>{'Error fallback'}</div>}>
                <ThrowingComponent />
            </ErrorBoundary>
        )

        expect(screen.getByText('Error fallback')).toBeInTheDocument()
        expect(screen.queryByText('Normal content')).toBeNull()
    })

    it('logs the error via componentDidCatch', () => {
        render(
            <ErrorBoundary fallback={<div>{'Error fallback'}</div>}>
                <ThrowingComponent />
            </ErrorBoundary>
        )

        expect(console.error).toHaveBeenCalled()
    })
})
