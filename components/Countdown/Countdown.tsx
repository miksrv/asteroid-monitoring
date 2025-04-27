import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import duration, { Duration } from 'dayjs/plugin/duration'
import { cn } from 'simple-react-ui-kit'

import styles from './styles.module.sass'

dayjs.extend(duration)

type TimeSign = '-' | '+'

interface CountdownProps {
    timestamp?: number
    hazardous?: boolean
}

export const Countdown: React.FC<CountdownProps> = ({ timestamp, hazardous }) => {
    const [durationTime, setDurationTime] = useState<Duration>(dayjs.duration(0))
    const [sign, setSign] = useState<TimeSign>('-')

    useEffect(() => {
        const updateDuration = () => {
            const now = dayjs()
            const difference = timestamp ? dayjs(timestamp).diff(now, 'second') : 0
            const isPast = difference < 0
            const absDifference = Math.abs(difference)

            const duration = dayjs.duration(absDifference, 'seconds')

            setDurationTime(duration)
            setSign(isPast ? '+' : '-')
        }

        if (timestamp) {
            updateDuration()
        }

        const interval = setInterval(updateDuration, 1000)

        return () => clearInterval(interval)
    }, [timestamp])

    return (
        <div className={cn(styles.countdown, sign === '+' && styles.countdownPast, hazardous && styles.hazardous)}>
            <span className={styles.title}>{'Обратный отсчет'}</span>
            <div className={styles.digitsContainer}>
                <h5 className={styles.tText}>
                    {'T'}
                    {sign}
                </h5>
                <div className={styles.digitBlock}>
                    <h3 className={styles.digit}>{Math.floor(durationTime.asDays()).toString().padStart(2, '0')}</h3>
                    <span className={styles.unit}>{'Дней'}</span>
                </div>
                <h4 className={styles.divider}>:</h4>
                <div className={styles.digitBlock}>
                    <h3 className={styles.digit}>{durationTime.hours().toString().padStart(2, '0')}</h3>
                    <span className={styles.unit}>{'Часов'}</span>
                </div>
                <h4 className={styles.divider}>:</h4>
                <div className={styles.digitBlock}>
                    <h3 className={styles.digit}>{durationTime.minutes().toString().padStart(2, '0')}</h3>
                    <span className={styles.unit}>{'Минут'}</span>
                </div>
                <h4 className={styles.divider}>:</h4>
                <div className={styles.digitBlock}>
                    <h3 className={styles.digit}>{durationTime.seconds().toString().padStart(2, '0')}</h3>
                    <span className={styles.unit}>{'Секунд'}</span>
                </div>
            </div>
        </div>
    )
}

export default Countdown
