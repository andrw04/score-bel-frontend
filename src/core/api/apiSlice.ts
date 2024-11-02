import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_API_URL, SCORE_BEL_ACCESS, TagTypes } from '../constants/api'

export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    tagTypes: [TagTypes.USER],
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL,
        prepareHeaders: (headers, { getState }) => {
            headers.set('Content-Type', 'application/json')

            const accessToken = localStorage.getItem(SCORE_BEL_ACCESS)

            console.log('accessToken', accessToken)

            if (accessToken) {
                console.log('set Authorization', accessToken)
                headers.set('Authorization', `Bearer ${accessToken}`)
            }

            return headers
        },
    }),

    endpoints: () => ({}),
})
