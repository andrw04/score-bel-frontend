import camelcaseKeys from 'camelcase-keys'
import { SCORE_BEL_MATCHES } from '../constants/api'
import { apiSlice } from './apiSlice'
import { LineUp, Match, MatchSummary } from '../types/matchesTypes'
import { PageResponseType } from '../types/common'

export const matchesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMatches: builder.query<
            PageResponseType<Match>,
            { fullTime?: boolean; tournament?: string, date?: string }
        >({
            query: ({ fullTime, tournament, date } = {}) => {
                const queryParams = new URLSearchParams()

                if (fullTime !== undefined) {
                    queryParams.append('full_time', fullTime.toString())
                }

                if (tournament !== undefined) {
                    queryParams.append('tournament', tournament)
                }

                if (date !== undefined) {
                    queryParams.append('date', date)
                }

                return `${SCORE_BEL_MATCHES}/?${queryParams.toString()}`
            },
            transformResponse: (response: any) =>
                camelcaseKeys(response, { deep: true }),
        }),
        getMatchById: builder.query<Match, string>({
            query: (id) => `${SCORE_BEL_MATCHES}/${id}/`,
            transformResponse: (response: any) =>
                camelcaseKeys(response, { deep: true }),
        }),
        getMatchLineUpById: builder.query<LineUp, string>({
            query: (id) => `${SCORE_BEL_MATCHES}/${id}/line-up/`,
            transformResponse: (response: any) =>
                camelcaseKeys(response, { deep: true }),
        }),
        getMatchSummaryById: builder.query<MatchSummary, string>({
            query: (id) => `${SCORE_BEL_MATCHES}/${id}/summary/`,
            transformResponse: (response: any) =>
                camelcaseKeys(response, { deep: true }),
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetMatchesQuery,
    useGetMatchByIdQuery,
    useGetMatchLineUpByIdQuery,
    useGetMatchSummaryByIdQuery,
} = matchesApi
