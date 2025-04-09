import React, { useMemo } from 'react'
import { Button, cn } from 'simple-react-ui-kit'

import styles from './styles.module.sass'

import { AsteroidListData } from '@/api/types'
import { Countdown } from '@/components/Countdown/Countdown'
import { formatDate } from '@/tools/date'
import { formatDistance } from '@/tools/helpers'

type AsteroidProps = {
    data: AsteroidListData
    maxDiameter?: number
    minDiameter?: number
    onClick?: (id?: number) => void
}

export const Asteroid: React.FC<AsteroidProps> = ({ data, maxDiameter, minDiameter, onClick }) => {
    const asteroidEstimatedSize = Math.round(
        ((data.estimated_diameter?.meters?.estimated_diameter_max || 0) +
            (data.estimated_diameter?.meters?.estimated_diameter_min || 0)) /
            2
    )

    const asteroidSpeed = Math.round(data.close_approach_data?.[0]?.relative_velocity?.kilometers_per_second || 0)

    const diameterScaleValue = useMemo(() => {
        if (maxDiameter && minDiameter) {
            const scale = 0.3 + ((asteroidEstimatedSize - minDiameter) / (maxDiameter - minDiameter)) * 0.7
            return Math.max(0.3, Math.min(1, scale))
        }

        return 1
    }, [asteroidEstimatedSize, maxDiameter, minDiameter])

    const approachDate = data.close_approach_data?.[0]?.epoch_date_close_approach
    const asteroidDistance = data.close_approach_data?.[0]?.miss_distance?.kilometers

    return (
        <div className={cn(styles.asteroidContainer, data.is_potentially_hazardous_asteroid && styles.dangerousBorder)}>
            <div>
                <h2 className={styles.title}>{data.name?.match(/\(([^)]+)\)/)?.[1] || ''}</h2>
                <div className={styles.dataBlock}>
                    <div className={styles.label}>{'Дата сближения'}</div>
                    <div className={styles.text}>
                        <span className={styles.dateDay}>{formatDate(approachDate, 'D MMM YYYY')}</span>
                        <span className={styles.dateTime}>{formatDate(approachDate, 'HH:mm:ss')}</span>
                    </div>
                </div>

                <div className={styles.dataBlock}>
                    <div className={styles.label}>{'Расстояние'}</div>
                    <div className={styles.text}>
                        <span className={styles.distanceValue}>{formatDistance(asteroidDistance)}</span>
                        <span className={styles.distanceUnit}>{'км'}</span>
                    </div>
                </div>
            </div>

            <div>
                {data.is_potentially_hazardous_asteroid ? (
                    <div className={styles.dangerous}>{'Опасный'}</div>
                ) : (
                    <div className={styles.notDangerous}>{'Безопасен'}</div>
                )}
                <div className={styles.dataBlock}>
                    <div className={styles.label}>{'Скорость'}</div>
                    <div className={styles.text}>
                        <span className={styles.dateDay}>{asteroidSpeed}</span>
                        <span className={styles.dateTime}>{'км/сек'}</span>
                    </div>
                </div>

                <div className={styles.dataBlock}>
                    <div className={styles.label}>{'Зв. величина'}</div>
                    <div className={styles.text}>
                        <span className={styles.distanceValue}>
                            {data?.absolute_magnitude_h && data?.absolute_magnitude_h > 0 ? '+' : ''}
                            {data.absolute_magnitude_h}
                        </span>
                        <span className={styles.distanceUnit}>{'m'}</span>
                    </div>
                </div>
            </div>

            <div className={styles.asteroidSection}>
                <div
                    className={styles.asteroidImage}
                    style={{ transform: `scale(${diameterScaleValue})` }}
                />
                <div className={styles.rulerImage} />
                <div className={styles.diameter}>
                    <span className={styles.value}>{asteroidEstimatedSize}</span>
                    <span className={styles.unit}>{'м'}</span>
                </div>
                <div className={styles.estimated}>{'[примерно]'}</div>
            </div>

            <div className={styles.countdownSection}>
                <Countdown
                    timestamp={approachDate}
                    hazardous={data.is_potentially_hazardous_asteroid}
                />
                <Button
                    className={styles.moreButton}
                    size={'medium'}
                    mode={'secondary'}
                    stretched={true}
                    onClick={() => onClick?.(data.id)}
                >
                    {'Подробнее'}
                </Button>
            </div>
        </div>

        //     {opened && (
        //         {asteroidData && (
        //                 <div className={styles.asteroidDetails}>
        //             <h4>Детали астероида:</h4>
        //             <p>ID: {asteroidData.id}</p>
        //             <p>Название: {asteroidData.name}</p>
        //             <p>Абсолютная величина: {asteroidData.absolute_magnitude_h}</p>
        //             <p>Орбитальный период: {asteroidData.orbital_data.orbital_period} дней</p>
        //             <p>Эксцентриситет: {asteroidData.orbital_data.eccentricity}</p>
        //             <p>Полуось орбиты: {asteroidData.orbital_data.semi_major_axis} а.е.</p>
        //             </div>
        //         )}
        //     )}
    )
}

export default Asteroid
