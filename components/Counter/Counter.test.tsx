import React from 'react'

import { render, screen } from '@testing-library/react'

import { Counter } from '@/components/Counter/Counter'

describe('Counter', () => {
    it('renders nothing (no divider) when both total and dangerous are undefined', () => {
        const { container } = render(<Counter />)
        expect(container.querySelector('.divider')).toBeNull()
    })

    it('renders nothing when total and dangerous are 0', () => {
        const { container } = render(
            <Counter
                total={0}
                dangerous={0}
            />
        )
        expect(container.querySelector('.divider')).toBeNull()
    })

    it('renders total count when total is provided', () => {
        render(<Counter total={42} />)
        expect(screen.getByText('42')).toBeInTheDocument()
        expect(screen.getByText(/counter.found/)).toBeInTheDocument()
    })

    it('renders dangerous count when dangerous is provided', () => {
        render(<Counter dangerous={5} />)
        expect(screen.getByText('5')).toBeInTheDocument()
        expect(screen.getByText(/counter.dangerous/)).toBeInTheDocument()
    })

    it('renders both total and dangerous when both are provided', () => {
        render(
            <Counter
                total={20}
                dangerous={3}
            />
        )
        expect(screen.getByText('20')).toBeInTheDocument()
        expect(screen.getByText(/counter.found/)).toBeInTheDocument()
        expect(screen.getByText('3')).toBeInTheDocument()
        expect(screen.getByText(/counter.dangerous/)).toBeInTheDocument()
    })

    it('does not render dangerous section when dangerous is 0', () => {
        render(
            <Counter
                total={10}
                dangerous={0}
            />
        )
        expect(screen.queryByText(/counter.dangerous/)).toBeNull()
    })

    it('does not render total section when total is 0', () => {
        render(
            <Counter
                total={0}
                dangerous={2}
            />
        )
        expect(screen.queryByText(/counter.found/)).toBeNull()
    })
})
