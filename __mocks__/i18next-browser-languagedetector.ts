export default class LanguageDetector {
    public type = '3rdParty' as const
    public init = jest.fn()
    public detect = jest.fn().mockReturnValue('ru')
    public cacheUserLanguage = jest.fn()
}
