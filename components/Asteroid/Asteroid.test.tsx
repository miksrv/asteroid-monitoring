import React from 'react'

import { fireEvent, render, screen } from '@testing-library/react'

import { AsteroidListData } from '@/api/types'
import { Asteroid } from '@/components/Asteroid/Asteroid'

// Mock child Countdown component to isolate Asteroid rendering
jest.mock('@/components/Countdown/Countdown', () => ({
    Countdown: () => <div data-testid='countdown-mock' />
}))

const mockAsteroid: AsteroidListData = {
    id: 3542519,
    name: '(2011 AG5)',
    is_potentially_hazardous_asteroid: false,
    absolute_magnitude_h: 21.4,
    estimated_diameter: {
        meters: {
            estimated_diameter_min: 100,
            estimated_diameter_max: 300
        },
        kilometers: {
            estimated_diameter_min: 0.1,
            estimated_diameter_max: 0.3
        },
        miles: {
            estimated_diameter_min: 0.06,
            estimated_diameter_max: 0.18
        },
        feet: {
            estimated_diameter_min: 328,
            estimated_diameter_max: 984
        }
    },
    close_approach_data: [
        {
            close_approach_date: '2024-02-05',
            epoch_date_close_approach: 1707177600000,
            relative_velocity: {
                kilometers_per_second: 12.5,
                kilometers_per_hour: 45000,
                miles_per_hour: 27961
            },
            miss_distance: {
                astronomical: 0.2,
                lunar: 77.8,
                kilometers: 29920000,
                miles: 18590000
            }
        }
    ]
}

const hazardousAsteroid: AsteroidListData = {
    ...mockAsteroid,
    is_potentially_hazardous_asteroid: true
}

describe('Asteroid', () => {
    it('renders asteroid name extracted from parentheses', () => {
        render(<Asteroid data={mockAsteroid} />)
        expect(screen.getByText('2011 AG5')).toBeInTheDocument()
    })

    it('renders label "asteroid.distance"', () => {
        render(<Asteroid data={mockAsteroid} />)
        expect(screen.getByText('asteroid.distance')).toBeInTheDocument()
    })

    it('renders label "asteroid.approachDate"', () => {
        render(<Asteroid data={mockAsteroid} />)
        expect(screen.getByText('asteroid.approachDate')).toBeInTheDocument()
    })

    it('renders label "asteroid.speed"', () => {
        render(<Asteroid data={mockAsteroid} />)
        expect(screen.getByText('asteroid.speed')).toBeInTheDocument()
    })

    it('renders label "asteroid.magnitude"', () => {
        render(<Asteroid data={mockAsteroid} />)
        expect(screen.getByText('asteroid.magnitude')).toBeInTheDocument()
    })

    it('renders speed in km/s rounded', () => {
        render(<Asteroid data={mockAsteroid} />)
        expect(screen.getByText('13')).toBeInTheDocument() // Math.round(12.5) = 13
    })

    it('renders "asteroid.safe" for non-hazardous asteroid', () => {
        render(<Asteroid data={mockAsteroid} />)
        expect(screen.getByText('asteroid.safe')).toBeInTheDocument()
        expect(screen.queryByText('asteroid.dangerous')).toBeNull()
    })

    it('renders "asteroid.dangerous" for hazardous asteroid', () => {
        render(<Asteroid data={hazardousAsteroid} />)
        expect(screen.getByText('asteroid.dangerous')).toBeInTheDocument()
        expect(screen.queryByText('asteroid.safe')).toBeNull()
    })

    it('renders estimated diameter in meters', () => {
        render(<Asteroid data={mockAsteroid} />)
        // Average of 100 and 300 = 200 meters
        expect(screen.getByText('200')).toBeInTheDocument()
        expect(screen.getByText('asteroid.meters')).toBeInTheDocument()
    })

    it('renders formatted miss distance in km', () => {
        render(<Asteroid data={mockAsteroid} />)
        expect(screen.getByText('29,920,000')).toBeInTheDocument()
        expect(screen.getByText('asteroid.km')).toBeInTheDocument()
    })

    it('renders Countdown component', () => {
        render(<Asteroid data={mockAsteroid} />)
        expect(screen.getByTestId('countdown-mock')).toBeInTheDocument()
    })

    it('renders the "asteroid.details" button', () => {
        render(<Asteroid data={mockAsteroid} />)
        expect(screen.getByRole('button', { name: 'asteroid.details' })).toBeInTheDocument()
    })

    it('calls onClick with asteroid id when details button is clicked', () => {
        const handleClick = jest.fn()
        render(
            <Asteroid
                data={mockAsteroid}
                onClick={handleClick}
            />
        )
        fireEvent.click(screen.getByRole('button', { name: 'asteroid.details' }))
        expect(handleClick).toHaveBeenCalledWith(3542519)
    })

    it('does not throw when onClick is not provided', () => {
        render(<Asteroid data={mockAsteroid} />)
        expect(() => {
            fireEvent.click(screen.getByRole('button', { name: 'asteroid.details' }))
        }).not.toThrow()
    })

    it('renders absolute magnitude with + sign when positive', () => {
        render(<Asteroid data={mockAsteroid} />)
        // 21.4 > 0, so '+' and '21.4' are rendered as sibling text nodes inside the span
        const magnitudeSpan = screen.getByText((content, element) => {
            return element?.tagName === 'SPAN' && element.textContent === '+21.4'
        })
        expect(magnitudeSpan).toBeInTheDocument()
    })

    it('renders estimated label', () => {
        render(<Asteroid data={mockAsteroid} />)
        expect(screen.getByText('asteroid.estimated')).toBeInTheDocument()
    })

    it('renders correctly when close_approach_data is empty', () => {
        const asteroidWithNoApproach: AsteroidListData = {
            ...mockAsteroid,
            close_approach_data: []
        }
        render(<Asteroid data={asteroidWithNoApproach} />)
        expect(screen.getByText('2011 AG5')).toBeInTheDocument()
    })

    it('renders correctly when name does not contain parentheses', () => {
        const asteroidWithSimpleName: AsteroidListData = {
            ...mockAsteroid,
            name: 'Apophis'
        }
        render(<Asteroid data={asteroidWithSimpleName} />)
        // Name without parens yields empty string from regex
        const title = document.querySelector('h2')
        expect(title?.textContent).toBe('')
    })

    it('applies scale transform to asteroid image', () => {
        const { container } = render(
            <Asteroid
                data={mockAsteroid}
                maxDiameter={500}
                minDiameter={50}
            />
        )
        const asteroidImage = container.querySelector('[style*="scale"]')
        expect(asteroidImage).toBeInTheDocument()
    })

    it('uses scale = 1 when maxDiameter and minDiameter are not provided', () => {
        const { container } = render(<Asteroid data={mockAsteroid} />)
        const asteroidImage = container.querySelector('[style*="scale(1)"]')
        expect(asteroidImage).toBeInTheDocument()
    })
})
