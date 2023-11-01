import { AsteroidData } from '@/api/types'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'

import Asteroid from './Asteroid'

jest.mock('next/image', () => ({
    __esModule: true,
    default: () => {
        return 'Next image stub'
    }
}))

const sampleAsteroidData = {
    close_approach_data: [
        {
            close_approach_date: '2023-10-26 08:00:00 UTC',
            close_approach_date_full: '2023-10-26 08:00:00 UTC',
            epoch_date_close_approach: 2,
            miss_distance: {
                astronomical: 0.5,
                kilometers: 1000,
                lunar: 1000,
                miles: 1000
            },
            orbiting_body: '',
            relative_velocity: {
                kilometers_per_hour: 1000,
                kilometers_per_second: 10,
                miles_per_hour: 700
            }
        }
    ],
    estimated_diameter: {
        meters: {
            estimated_diameter_max: 200,
            estimated_diameter_min: 100
        }
    },
    is_potentially_hazardous_asteroid: false,
    name: 'Sample Asteroid (2023 XYZ)'
}

describe('Asteroid', () => {
    it('renders asteroid details correctly', () => {
        render(<Asteroid data={sampleAsteroidData} />)

        expect(screen.getByText('2023 XYZ')).toBeInTheDocument()
        expect(screen.getByText('Расчетный размер - 150 м')).toBeInTheDocument()
        expect(
            screen.getByText('Время сближения - 08:00:00 UTC')
        ).toBeInTheDocument()
        expect(screen.getByText('Расстояние - 0.5 au')).toBeInTheDocument()
        expect(screen.getByText('Скорость - 10 км/сек')).toBeInTheDocument()
        expect(screen.getByText('Не представляет угрозы')).toBeInTheDocument()
    })

    it('renders a dangerous asteroid correctly', () => {
        const dangerousAsteroidData = {
            ...sampleAsteroidData,
            is_potentially_hazardous_asteroid: true
        }

        render(<Asteroid data={dangerousAsteroidData} />)

        expect(screen.getByText('Потенциально опасный')).toBeInTheDocument()
    })

    it('renders a comparison speed image and text', () => {
        render(<Asteroid data={sampleAsteroidData} />)

        expect(screen.getAllByText('Next image stub').length).toBe(2)
    })
})
