import { store, wrapper } from '@/api/store'

describe('Redux store', () => {
    it('creates a store instance', () => {
        const storeInstance = store()
        expect(storeInstance).toBeDefined()
    })

    it('store has getState method', () => {
        const storeInstance = store()
        expect(typeof storeInstance.getState).toBe('function')
    })

    it('store has dispatch method', () => {
        const storeInstance = store()
        expect(typeof storeInstance.dispatch).toBe('function')
    })

    it('store state includes api reducer path', () => {
        const storeInstance = store()
        const state = storeInstance.getState()
        expect(state).toHaveProperty('api')
    })

    it('wrapper is defined (next-redux-wrapper)', () => {
        expect(wrapper).toBeDefined()
    })

    it('wrapper has useWrappedStore method', () => {
        expect(typeof wrapper.useWrappedStore).toBe('function')
    })

    it('initial api state has expected shape', () => {
        const storeInstance = store()
        const state = storeInstance.getState()
        // RTK Query initial state has queries, mutations, provided, subscriptions, config
        expect(state.api).toHaveProperty('queries')
        expect(state.api).toHaveProperty('mutations')
    })
})
