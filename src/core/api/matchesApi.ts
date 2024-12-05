import camelcaseKeys from 'camelcase-keys'
import { SCORE_BEL_MATCHES, TagTypes } from '../constants/api'
import { apiSlice } from './apiSlice'
import {
    LineUp,
    Match,
    MatchDiscussionMessage,
    MatchSummary,
    MatchVotes,
    SendMessage,
    VoteForMatch,
} from '../types/matchesTypes'
import { PageResponseType } from '../types/common'

export const matchesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMatches: builder.query<
            PageResponseType<Match>,
            { fullTime?: boolean; tournament?: string; date?: string }
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
        getMatchVotes: builder.query<MatchVotes, string>({
            query: (id) => `${SCORE_BEL_MATCHES}/${id}/poll/`,
            transformResponse: (response: any) =>
                camelcaseKeys(response, { deep: true }),
            providesTags: [TagTypes.VOTE],
        }),
        voteForMatch: builder.mutation<void, VoteForMatch>({
            query: ({ matchId, body }) => ({
                url: `${SCORE_BEL_MATCHES}/${matchId}/vote/`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [TagTypes.VOTE],
        }),
        getMatchDiscussionMessages: builder.query<
            MatchDiscussionMessage[],
            string
        >({
            query: (id) => `${SCORE_BEL_MATCHES}/${id}/discussion-messages/`,
            transformResponse: (response: any) =>
                camelcaseKeys(response, { deep: true }),
            providesTags: [TagTypes.CHAT]
        }),
        sendDiscussionMessage: builder.mutation<void, SendMessage>({
            query: ({ matchId, body }) => ({
                url: `${SCORE_BEL_MATCHES}/${matchId}/message/`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [TagTypes.CHAT]
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetMatchesQuery,
    useGetMatchByIdQuery,
    useGetMatchLineUpByIdQuery,
    useGetMatchSummaryByIdQuery,
    useGetMatchVotesQuery,
    useVoteForMatchMutation,
    useGetMatchDiscussionMessagesQuery,
    useSendDiscussionMessageMutation,
} = matchesApi
