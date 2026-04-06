import React from 'react'
import { useTranslation } from 'react-i18next'

import styles from './styles.module.sass'

export const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation()

    const handleSwitch = (lang: string) => {
        if (i18n.language !== lang) {
            void i18n.changeLanguage(lang)
        }
    }

    return (
        <div className={styles.switcher}>
            <button
                className={i18n.language === 'ru' ? styles.active : styles.button}
                onClick={() => handleSwitch('ru')}
                aria-label={'Switch to Russian'}
                aria-pressed={i18n.language === 'ru'}
            >
                {'RU'}
            </button>
            <span className={styles.divider}>{'/'}</span>
            <button
                className={i18n.language === 'en' ? styles.active : styles.button}
                onClick={() => handleSwitch('en')}
                aria-label={'Switch to English'}
                aria-pressed={i18n.language === 'en'}
            >
                {'EN'}
            </button>
        </div>
    )
}

export default LanguageSwitcher
