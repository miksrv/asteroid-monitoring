import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'

import Counter from './Counter'

describe('Counter', () => {
    it('should render total count', () => {
        const total = 42

        render(<Counter total={total} />)

        expect(screen.getByText(total)).toBeInTheDocument()
        expect(screen.getByText('Найдено астероидов')).toBeInTheDocument()
        expect(screen.queryByText('Потенциально опасных')).toBeNull()
    })

    it('should render dangerous count', () => {
        const dangerous = 10

        render(<Counter dangerous={dangerous} />)

        expect(screen.getByText(dangerous)).toBeInTheDocument()
        expect(screen.getByText('Потенциально опасных')).toBeInTheDocument()
        expect(screen.queryByText('Найдено астероидов')).toBeNull()
    })

    it('should render both counts', () => {
        const total = 42
        const dangerous = 10

        render(
            <Counter
                total={total}
                dangerous={dangerous}
            />
        )

        expect(screen.getByText(total)).toBeInTheDocument()
        expect(screen.getByText('Найдено астероидов')).toBeInTheDocument()
        expect(screen.getByText(dangerous)).toBeInTheDocument()
        expect(screen.getByText('Потенциально опасных')).toBeInTheDocument()
    })

    it('should not render without counts', () => {
        render(<Counter />)

        expect(screen.queryByText(/Найдено астероидов/)).toBeNull()
        expect(screen.queryByText(/Потенциально опасных/)).toBeNull()
    })
})
