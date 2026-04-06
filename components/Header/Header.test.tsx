import React from 'react'
import { render, screen } from '@testing-library/react'

import { Header } from '@/components/Header/Header'

describe('Header', () => {
    it('renders the main heading', () => {
        render(<Header />)
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
        expect(screen.getByText('Мониторинг астероидов')).toBeInTheDocument()
    })

    it('renders the asteroid image', () => {
        render(<Header />)
        // image is mocked via identity-obj-proxy for static imports and __mocks__/next/image.tsx
        const img = screen.getByAltText('Астероид')
        expect(img).toBeInTheDocument()
    })

    it('renders a header element (landmark role banner)', () => {
        render(<Header />)
        expect(screen.getByRole('banner')).toBeInTheDocument()
    })

    it('renders a divider element after the header', () => {
        const { container } = render(<Header />)
        const headerEl = container.querySelector('header')
        expect(headerEl).toBeInTheDocument()
        expect(headerEl?.nextElementSibling).toBeInTheDocument()
    })
})
