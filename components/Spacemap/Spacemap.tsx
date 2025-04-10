import React, { useEffect } from 'react'
import * as Spacekit from 'spacekit.js'

import { OrbitalData } from '@/api/types'

type AsteroidProps = {
    asteroidName?: string
    orbitalData?: OrbitalData
}

export const Spacemap: React.FC<AsteroidProps> = ({ asteroidName, orbitalData }) => {
    useEffect(() => {
        const container = document.getElementById('my-container') as HTMLCanvasElement

        if (container && orbitalData) {
            const viz = new Spacekit.Simulation(container, {
                basePath: 'https://typpo.github.io/spacekit/src',
                startDate: new Date(),
                unitsPerAu: 10.0,
                // jd: 2443568.0,
                jdPerSecond: 1.0,
                startPaused: true,
                camera: {
                    initialPosition: [-10, 5, 3],
                    enableDrift: true
                }
            })

            // Create a skybox using NASA TYCHO artwork.
            viz.createStars()

            // Create our first object - the sun - using a preset space object.
            viz.createObject('sun', Spacekit.SpaceObjectPresets.SUN)

            // Then add some planets
            viz.createObject('mercury', Spacekit.SpaceObjectPresets.MERCURY)
            viz.createObject('venus', Spacekit.SpaceObjectPresets.VENUS)
            viz.createObject('mars', Spacekit.SpaceObjectPresets.MARS)
            viz.createObject('jupiter', Spacekit.SpaceObjectPresets.JUPITER)
            viz.createObject('saturn', Spacekit.SpaceObjectPresets.SATURN)
            viz.createObject('uranus', Spacekit.SpaceObjectPresets.URANUS)
            viz.createObject('neptune', Spacekit.SpaceObjectPresets.NEPTUNE)

            viz.createSphere('earth', {
                textureUrl: './images/earthtexture.jpg',
                radius: 0.01, // Exxagerate size
                ephem: Spacekit.EphemPresets.EARTH,
                levelsOfDetail: [
                    {
                        radii: 0,
                        segments: 64
                    },
                    {
                        radii: 30,
                        segments: 16
                    },
                    {
                        radii: 60,
                        segments: 8
                    }
                ],
                atmosphere: {
                    enable: true,
                    color: 0xc7c1a8
                },
                rotation: {
                    enable: true,
                    lambdaDeg: 50,
                    betaDeg: -63,
                    period: 3.755067,
                    yorp: 1.9e-8,
                    phi0: 0,
                    jd0: 2443568.0,
                    speed: 1
                }
            })

            const ephem = new Spacekit.Ephem(
                {
                    epoch: Number(orbitalData.epoch_osculation),
                    a: Number(orbitalData.semi_major_axis),
                    e: Number(orbitalData.eccentricity),
                    i: Number(orbitalData.inclination),
                    om: Number(orbitalData.ascending_node_longitude),
                    w: Number(orbitalData.perihelion_argument),
                    ma: Number(orbitalData.mean_anomaly)
                },
                'deg'
            )

            const asteroid = viz.createShape('asteroid', {
                ephem,
                labelText: asteroidName,
                ecliptic: {
                    displayLines: true,
                    lineColor: 0xff0000
                },
                shape: {
                    shapeUrl: './A1046.M1863.obj'
                },
                rotation: {
                    lambdaDeg: 251,
                    betaDeg: -63,
                    period: 3.755067,
                    yorp: 1.9e-8,
                    phi0: 0,
                    jd0: 2443568.0
                },
                debug: {
                    // showAxes: true,
                }
            })

            asteroid.initRotation()
            asteroid.startRotation()

            viz.createLight([0, 0, 0])
            viz.createAmbientLight()

            viz.zoomToFit(asteroid, 0.1)

            viz.getViewer().followObject(asteroid, [-0.01, -0.01, 0.01])
        }
    }, [orbitalData])

    return (
        <div
            id={'my-container'}
            style={{ width: '100%', height: '100%', minHeight: '500px' }}
        />
    )
}

export default Spacemap
