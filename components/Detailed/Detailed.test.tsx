import React from 'react'

import { render, screen } from '@testing-library/react'

import { AsteroidData } from '@/api/types'
import { Detailed } from '@/components/Detailed/Detailed'

const mockUseGetAsteroidDataQuery = jest.fn()

jest.mock('@/api/api', () => ({
    __esModule: true,
    default: {
        useGetAsteroidDataQuery: (...args: unknown[]) => mockUseGetAsteroidDataQuery(...args)
    }
}))

jest.mock('@/components/Spacemap', () => ({
    __esModule: true,
    default: ({ asteroidName }: { asteroidName?: string }) => <div data-testid='spacemap-mock'>{asteroidName}</div>
}))

const mockOrbitalData = {
    orbit_id: '1',
    orbit_determination_date: '2024-01-01',
    first_observation_date: '2010-01-01',
    last_observation_date: '2024-01-01',
    data_arc_in_days: 5113,
    observations_used: 1234,
    orbit_uncertainty: '0',
    minimum_orbit_intersection: '0.0001',
    jupiter_tisserand_invariant: '5.6',
    epoch_osculation: '2460200.5',
    eccentricity: '0.22',
    semi_major_axis: '1.43',
    inclination: '3.7',
    ascending_node_longitude: '134.0',
    orbital_period: '624.5',
    perihelion_distance: '1.12',
    perihelion_argument: '58.3',
    aphelion_distance: '1.74',
    perihelion_time: '2459900.5',
    mean_anomaly: '56.0',
    mean_motion: '0.577',
    equinox: 'J2000',
    orbit_class: {
        orbit_class_type: 'APO',
        orbit_class_description: 'Apollo',
        orbit_class_range: 'a >= 1.0 AU'
    }
}

const mockAsteroidData: AsteroidData = {
    links: { self: 'https://api.nasa.gov/neo/rest/v1/neo/3542519' },
    id: '3542519',
    neo_reference_id: '3542519',
    name: '2011 AG5',
    designation: '2011 AG5',
    nasa_jpl_url: 'https://ssd.jpl.nasa.gov',
    absolute_magnitude_h: 21.4,
    estimated_diameter: {
        kilometers: { estimated_diameter_min: 0.1, estimated_diameter_max: 0.3 },
        meters: { estimated_diameter_min: 100, estimated_diameter_max: 300 },
        miles: { estimated_diameter_min: 0.06, estimated_diameter_max: 0.18 },
        feet: { estimated_diameter_min: 328, estimated_diameter_max: 984 }
    },
    is_potentially_hazardous_asteroid: false,
    close_approach_data: [],
    orbital_data: mockOrbitalData,
    is_sentry_object: false
}

describe('Detailed', () => {
    beforeEach(() => {
        mockUseGetAsteroidDataQuery.mockReturnValue({ data: undefined, isLoading: false })
    })

    it('renders a container div', () => {
        const { container } = render(<Detailed asteroidId={3542519} />)
        expect(container.firstChild).toBeInTheDocument()
    })

    it('renders Skeleton when there is no data (no orbital_data)', () => {
        mockUseGetAsteroidDataQuery.mockReturnValue({ data: undefined, isLoading: false })
        render(<Detailed asteroidId={3542519} />)
        expect(screen.getByTestId('skeleton')).toBeInTheDocument()
        expect(screen.queryByTestId('spacemap-mock')).toBeNull()
    })

    it('renders Skeleton when isLoading is true', () => {
        mockUseGetAsteroidDataQuery.mockReturnValue({ data: undefined, isLoading: true })
        render(<Detailed asteroidId={3542519} />)
        expect(screen.getByTestId('skeleton')).toBeInTheDocument()
    })

    it('renders Spacemap when asteroidData with orbital_data is available', () => {
        mockUseGetAsteroidDataQuery.mockReturnValue({ data: mockAsteroidData, isLoading: false })
        render(<Detailed asteroidId={3542519} />)
        expect(screen.getByTestId('spacemap-mock')).toBeInTheDocument()
    })

    it('passes asteroidName to Spacemap', () => {
        mockUseGetAsteroidDataQuery.mockReturnValue({ data: mockAsteroidData, isLoading: false })
        render(<Detailed asteroidId={3542519} />)
        expect(screen.getByText('2011 AG5')).toBeInTheDocument()
    })

    it('calls useGetAsteroidDataQuery with asteroidId when asteroidId is provided', () => {
        render(<Detailed asteroidId={3542519} />)
        expect(mockUseGetAsteroidDataQuery).toHaveBeenCalledWith(3542519, expect.objectContaining({ skip: false }))
    })

    it('calls useGetAsteroidDataQuery with skip: true when asteroidId is undefined', () => {
        render(<Detailed />)
        expect(mockUseGetAsteroidDataQuery).toHaveBeenCalledWith(undefined, expect.objectContaining({ skip: true }))
    })

    it('renders container with calculated height based on clientHeight prop', () => {
        const { container } = render(
            <Detailed
                asteroidId={3542519}
                clientHeight={600}
            />
        )
        const wrapper = container.firstChild as HTMLElement
        expect(wrapper.style.height).toBe('400px') // 600 - 200
    })

    it('renders container with 0px height when clientHeight defaults to 200', () => {
        const { container } = render(<Detailed asteroidId={3542519} />)
        const wrapper = container.firstChild as HTMLElement
        expect(wrapper.style.height).toBe('0px') // 200 - 200
    })
})
