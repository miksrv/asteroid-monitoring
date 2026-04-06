import React from 'react'

import { render, screen } from '@testing-library/react'

import { Header } from '@/components/Header/Header'

describe('Header', () => {
    it('renders the main heading', () => {
        render(<Header />)
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
        expect(screen.getByText('header.title')).toBeInTheDocument()
    })

    it('renders the asteroid image', () => {
        render(<Header />)
        // image alt text is now a translation key due to useTranslation mock returning key as-is
        const img = screen.getByAltText('header.imageAlt')
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

    it('renders the language switcher', () => {
        render(<Header />)
        expect(screen.getByText('RU')).toBeInTheDocument()
        expect(screen.getByText('EN')).toBeInTheDocument()
    })
})
