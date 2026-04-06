import React from 'react'

import { render, screen } from '@testing-library/react'

import { Footer } from '@/components/Footer/Footer'

describe('Footer', () => {
    it('renders the footer element', () => {
        render(<Footer />)
        expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })

    it('renders powered by text', () => {
        render(<Footer />)
        expect(screen.getByText(/Powered by NextJS/)).toBeInTheDocument()
    })

    it('renders copyright text with author name', () => {
        render(<Footer />)
        expect(screen.getByText('Mik')).toBeInTheDocument()
    })

    it('renders link to miksoft.pro', () => {
        render(<Footer />)
        const miksoftLink = screen.getByRole('link', { name: 'Mik' })
        expect(miksoftLink).toHaveAttribute('href', 'https://miksoft.pro')
    })

    it('renders GitHub link', () => {
        render(<Footer />)
        const githubLink = screen.getByRole('link', { name: 'GitHub' })
        expect(githubLink).toHaveAttribute('href', 'https://github.com/miksrv/asteroid-monitoring')
    })

    it('renders current year in copyright', () => {
        render(<Footer />)
        const currentYear = new Date().getFullYear().toString()
        expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument()
    })

    it('renders version number', () => {
        render(<Footer />)
        // version comes from package.json
        expect(screen.getByText(/v\d+\.\d+\.\d+/)).toBeInTheDocument()
    })

    it('renders update timestamp in footer', () => {
        render(<Footer />)
        // The update date is rendered in DD.MM.YYYY, HH:mm format
        expect(screen.getByText(/\d{2}\.\d{2}\.\d{4}/)).toBeInTheDocument()
    })
})
