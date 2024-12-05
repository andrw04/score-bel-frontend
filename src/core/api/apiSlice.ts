import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_API_URL, SCORE_BEL_ACCESS, TagTypes } from '../constants/api'
import { isValidToken } from '../helpers/authHelpers'
import { access } from 'fs'
import { useDispatch } from 'react-redux'
import { removeTokens } from '../store/authSlice'

export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    tagTypes: [TagTypes.VOTE, TagTypes.CHAT],
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json')

            const accessToken = localStorage.getItem(SCORE_BEL_ACCESS)

            if (accessToken && isValidToken(accessToken)) {
                headers.set('Authorization', `Bearer ${accessToken}`)
            }

            return headers
        },
    }),

    endpoints: () => ({}),
})
