import { AsteroidData } from '@/api/types'
import { comparisonSize } from '@/functions/comparison'
import Image from 'next/image'
import React from 'react'

import imgBullet from '@/public/images/rifle-bullet.png'

import styles from './styles.module.sass'

type AsteroidProps = {
    data: AsteroidData
}

export const Asteroid: React.FC<AsteroidProps> = ({ data }) => {
    const asteroidEstimatedSize = Math.round(
        ((data.estimated_diameter?.meters?.estimated_diameter_max || 0) +
            (data.estimated_diameter?.meters?.estimated_diameter_min || 0)) /
            2
    )

    const asteroidApproachTime =
        data.close_approach_data?.[0]?.close_approach_date_full?.split(' ')[1]

    const asteroidSpeed = Math.round(
        data.close_approach_data?.[0]?.relative_velocity
            ?.kilometers_per_second || 0
    )

    // TODO fix round
    const asteroidMissDistance =
        Math.round(
            (data.close_approach_data?.[0]?.miss_distance?.astronomical || 0) *
                100
        ) / 100

    const compareSize = comparisonSize(asteroidEstimatedSize)

    return (
        <div className={styles.asteroid}>
            <div className={styles.container}>
                <div className={styles.details}>
                    <h3 className={styles.name}>
                        {data.name?.match(/\(([^)]+)\)/)?.[1] || ''}
                    </h3>
                    <p>Расчетный размер - {asteroidEstimatedSize} м</p>
                    <p>Время сближения - {asteroidApproachTime} UTC</p>
                    <p>Расстояние - {asteroidMissDistance} au</p>
                    <p>Скорость - {asteroidSpeed} км/сек</p>
                    {data.is_potentially_hazardous_asteroid ? (
                        <div className={styles.dangerous}>
                            Потенциально опасный
                        </div>
                    ) : (
                        <div className={styles.notDangerous}>
                            Не представляет угрозы
                        </div>
                    )}
                </div>
                <div className={styles.comparison}>
                    <Image
                        className={styles.comparisonSizeImage}
                        src={compareSize.img || ''}
                        alt={compareSize.text}
                    />
                    <div>{compareSize.text}</div>
                </div>
                <div className={styles.comparison}>
                    <Image
                        className={styles.comparisonSpeedImage}
                        src={imgBullet}
                        alt={'Скорость астероида'}
                    />
                    <div>
                        {asteroidSpeed > 1 && `${asteroidSpeed}X`} Скорости пули
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Asteroid
