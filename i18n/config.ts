import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from '@/public/locales/en/common.json'
import ru from '@/public/locales/ru/common.json'

void i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            ru: { common: ru },
            en: { common: en }
        },
        defaultNS: 'common',
        fallbackLng: 'ru',
        supportedLngs: ['ru', 'en'],
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
            lookupLocalStorage: 'language'
        },
        interpolation: {
            escapeValue: false
        }
    })

export default i18n
