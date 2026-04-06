import { API } from '@/api/api'

describe('API (RTK Query endpoints)', () => {
    it('is defined', () => {
        expect(API).toBeDefined()
    })

    it('has reducerPath set to "api"', () => {
        expect(API.reducerPath).toBe('api')
    })

    it('exports useGetAsteroidsListMutation hook', () => {
        expect(typeof API.useGetAsteroidsListMutation).toBe('function')
    })

    it('exports useGetAsteroidDataMutation hook', () => {
        expect(typeof API.useGetAsteroidDataMutation).toBe('function')
    })

    it('has reducer defined', () => {
        expect(typeof API.reducer).toBe('function')
    })

    it('has middleware defined', () => {
        expect(typeof API.middleware).toBe('function')
    })

    it('has endpoints with getAsteroidsList', () => {
        expect(API.endpoints.getAsteroidsList).toBeDefined()
    })

    it('has endpoints with getAsteroidData', () => {
        expect(API.endpoints.getAsteroidData).toBeDefined()
    })
})
