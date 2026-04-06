import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useMock: any = [(k: string) => k, {}]

useMock.t = (k: string) => k
useMock.i18n = { changeLanguage: jest.fn(), language: 'ru' }

module.exports = {
    I18nextProvider: ({ children }: { children: React.ReactNode }) => children,
    Trans: ({ children }: { children: React.ReactNode }) => children,
    initReactI18next: { type: '3rdParty', init: jest.fn() },
    useTranslation: () => useMock
}
