import React from 'react'
import * as Spacekit from 'spacekit.js'

import { render } from '@testing-library/react'

import { OrbitalData } from '@/api/types'
import { Spacemap } from '@/components/Spacemap/Spacemap'

// spacekit.js uses WebGL and Three.js — mock it entirely
jest.mock('spacekit.js', () => {
    const mockFollowObject = jest.fn()
    const mockGetViewer = jest.fn().mockReturnValue({ followObject: mockFollowObject })
    const mockCreateShape = jest.fn().mockReturnValue({
        initRotation: jest.fn(),
        startRotation: jest.fn()
    })

    const MockSimulationInstance = {
        createStars: jest.fn(),
        createObject: jest.fn(),
        createSphere: jest.fn().mockReturnValue({}),
        createShape: mockCreateShape,
        createLight: jest.fn(),
        createAmbientLight: jest.fn(),
        getViewer: mockGetViewer,
        zoomToFit: jest.fn().mockResolvedValue(undefined)
    }

    return {
        Simulation: jest.fn().mockImplementation(() => MockSimulationInstance),
        Ephem: jest.fn().mockImplementation(() => ({})),
        SpaceObjectPresets: {
            SUN: 'SUN',
            MERCURY: 'MERCURY',
            VENUS: 'VENUS',
            MARS: 'MARS',
            JUPITER: 'JUPITER',
            SATURN: 'SATURN',
            URANUS: 'URANUS',
            NEPTUNE: 'NEPTUNE'
        },
        EphemPresets: {
            EARTH: 'EARTH'
        }
    }
})

const mockOrbitalData: OrbitalData = {
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

describe('Spacemap', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders the container div with id "my-container"', () => {
        const { container } = render(<Spacemap />)
        const div = container.querySelector('#my-container')
        expect(div).toBeInTheDocument()
    })

    it('renders container with 100% width style', () => {
        const { container } = render(<Spacemap />)
        const div = container.querySelector('#my-container') as HTMLElement
        expect(div.style.width).toBe('100%')
    })

    it('renders container with 100% height style', () => {
        const { container } = render(<Spacemap />)
        const div = container.querySelector('#my-container') as HTMLElement
        expect(div.style.height).toBe('100%')
    })

    it('does not initialize Simulation when orbitalData is not provided', () => {
        render(<Spacemap asteroidName='Test Asteroid' />)
        expect(Spacekit.Simulation).not.toHaveBeenCalled()
    })

    it('initializes Simulation when orbitalData is provided', () => {
        render(
            <Spacemap
                asteroidName='2011 AG5'
                orbitalData={mockOrbitalData}
            />
        )
        expect(Spacekit.Simulation).toHaveBeenCalledTimes(1)
    })

    it('creates Ephem with correct orbital parameters', () => {
        render(
            <Spacemap
                asteroidName='2011 AG5'
                orbitalData={mockOrbitalData}
            />
        )
        expect(Spacekit.Ephem).toHaveBeenCalledWith(
            expect.objectContaining({
                a: Number(mockOrbitalData.semi_major_axis),
                e: Number(mockOrbitalData.eccentricity),
                i: Number(mockOrbitalData.inclination),
                om: Number(mockOrbitalData.ascending_node_longitude),
                w: Number(mockOrbitalData.perihelion_argument),
                ma: Number(mockOrbitalData.mean_anomaly)
            }),
            'deg'
        )
    })

    it('passes correct basePath to Simulation config', () => {
        render(
            <Spacemap
                asteroidName='2011 AG5'
                orbitalData={mockOrbitalData}
            />
        )
        expect(Spacekit.Simulation).toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({
                basePath: 'https://typpo.github.io/spacekit/src'
            })
        )
    })

    it('does not throw when rendered without any props', () => {
        expect(() => render(<Spacemap />)).not.toThrow()
    })

    it('does not throw when rendered with only asteroidName', () => {
        expect(() => render(<Spacemap asteroidName='Apophis' />)).not.toThrow()
    })
})
