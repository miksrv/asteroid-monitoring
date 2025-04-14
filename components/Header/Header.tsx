import React from 'react'
import Image from 'next/image'

import styles from './styles.module.sass'

import asteroidImage from '@/public/images/asteroid.png'

export const Header: React.FC = () => (
    <>
        <header className={styles.header}>
            <Image
                className={styles.asteroidImage}
                src={asteroidImage}
                alt={'Астероид'}
            />
            <h1 className={styles.title}>{'Мониторинг астероидов'}</h1>
        </header>
        <div className={styles.divider} />
    </>
)

export default Header
