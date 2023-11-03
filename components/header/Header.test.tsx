import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { Header } from './Header'

jest.mock('next/image', () => ({
    __esModule: true,
    default: () => {
        return 'Next image stub'
    }
}))

describe('Header', () => {
    it('should render the header with asteroid image and title', () => {
        render(<Header />)

        const asteroidImage = screen.getByText('Next image stub')
        const title = screen.getByText('Мониторинг астероидов')

        expect(asteroidImage).toBeInTheDocument()
        expect(title).toBeInTheDocument()
    })
})
