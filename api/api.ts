import { HYDRATE } from 'next-redux-wrapper'

import { RootState } from '@/api/store'
import { ApiNasaResponse, AsteroidData } from '@/api/types'
import type { Action, PayloadAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const isHydrateAction = (action: Action): action is PayloadAction<RootState> => action.type === HYDRATE

const API_URL = 'https://api.nasa.gov/neo/rest/v1/'

export const API = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    endpoints: (builder) => ({
        getAsteroidsList: builder.mutation<ApiNasaResponse, string>({
            query: (date) => `feed?api_key=${process.env.NEXT_PUBLIC_API_KEY}&start_date=${date}&end_date=${date}`
        }),
        getAsteroidData: builder.mutation<AsteroidData, number>({
            query: (id) => `neo/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        })
    }),
    extractRehydrationInfo(action, { reducerPath }): any {
        if (isHydrateAction(action)) {
            return action.payload[reducerPath]
        }
    },
    reducerPath: 'api',
    tagTypes: []
})

// Export hooks for usage in functional components
export default API

// export endpoints for use in SSR
// export const { getAsteroids } = api.endpoints
