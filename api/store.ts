import { createWrapper } from 'next-redux-wrapper'
import { configureStore } from '@reduxjs/toolkit'

import { API } from './api'

export const store = () =>
    configureStore({
        middleware: (gDM) => gDM().concat(API.middleware),
        reducer: {
            [API.reducerPath]: API.reducer
        }
    })

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>

export const wrapper = createWrapper<AppStore>(store, { debug: false })
