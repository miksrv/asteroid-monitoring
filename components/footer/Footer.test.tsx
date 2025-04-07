import React from 'react'

import '@testing-library/jest-dom'

import Footer from './Footer'

import { render, screen } from '@testing-library/react'

// Mock the package.json data and update function
jest.mock('@/package.json', () => ({ version: '1.0.0' }))
jest.mock('@/update', () => '2023-10-30')

describe('Footer', () => {
    it('should render copyright information with version and last update', () => {
        render(<Footer />)

        const copyrightLink = screen.getByRole('link', {
            name: 'Mik'
        })

        expect(copyrightLink).toBeInTheDocument()
        expect(screen.getByText(/Version/)).toBeInTheDocument()
        expect(screen.getByText(/1.0.0/)).toBeInTheDocument()
    })

    it('should display the current year', () => {
        render(<Footer />)

        const currentYear = new Date().getFullYear()
        const yearText = screen.getByText(new RegExp(currentYear.toString()))

        expect(yearText).toBeInTheDocument()
    })
})
