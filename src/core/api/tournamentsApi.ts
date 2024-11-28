import camelcaseKeys from 'camelcase-keys'
import { TOURNAMENTS_PATH } from '../constants/routes'
import {
    Tournament,
    TournamentTeamResponse,
} from '../types/tournamentTypes'
import { apiSlice } from './apiSlice'
import { SCORE_BEL_TOURNAMENTS } from '../constants/api'
import { PageResponseType } from '../types/common'

export const tournamentsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTournaments: builder.query<PageResponseType<Tournament>, void>({
            query: () => SCORE_BEL_TOURNAMENTS,
            transformResponse: (response: any) =>
                camelcaseKeys(response, { deep: true }),
        }),
        getTournamentTable: builder.query<TournamentTeamResponse[], string>({
            query: (codeName) => `${SCORE_BEL_TOURNAMENTS}/${codeName}/table`,
            transformResponse: (response: any) =>
                camelcaseKeys(response, { deep: true }),
        }),
    }),
    overrideExisting: false,
})

export const { useGetTournamentsQuery, useGetTournamentTableQuery } =
    tournamentsApi
