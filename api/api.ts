import { ApiNasaResponse } from '@/api/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

export const API = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL
    }),
    endpoints: (builder) => ({
        getAsteroids: builder.mutation<ApiNasaResponse, string>({
            query: (date) =>
                `?api_key=${process.env.NEXT_PUBLIC_API_KEY}&start_date=${date}&end_date=${date}`
        })
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
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
