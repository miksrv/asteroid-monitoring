import { API } from '@/api/api'

describe('API (RTK Query endpoints)', () => {
    it('is defined', () => {
        expect(API).toBeDefined()
    })

    it('has reducerPath set to "api"', () => {
        expect(API.reducerPath).toBe('api')
    })

    it('exports useGetAsteroidsListQuery hook', () => {
        expect(typeof API.useGetAsteroidsListQuery).toBe('function')
    })

    it('exports useGetAsteroidDataQuery hook', () => {
        expect(typeof API.useGetAsteroidDataQuery).toBe('function')
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
