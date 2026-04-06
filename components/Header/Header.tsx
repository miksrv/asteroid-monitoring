import React from 'react'
import { useTranslation } from 'react-i18next'

import Image from 'next/image'

import LanguageSwitcher from '@/components/LanguageSwitcher'
import asteroidImage from '@/public/images/asteroid.png'

import styles from './styles.module.sass'

export const Header: React.FC = () => {
    const { t } = useTranslation()

    return (
        <>
            <header className={styles.header}>
                <Image
                    className={styles.asteroidImage}
                    src={asteroidImage}
                    alt={t('header.imageAlt')}
                />
                <h1 className={styles.title}>{t('header.title')}</h1>
                <div className={styles.languageSwitcherWrapper}>
                    <LanguageSwitcher />
                </div>
            </header>
            <div className={styles.divider} />
        </>
    )
}

export default Header
