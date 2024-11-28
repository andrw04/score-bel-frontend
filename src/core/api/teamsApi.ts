import camelcaseKeys from "camelcase-keys";
import { SCORE_BEL_TEAMS } from "../constants/api";
import { PageResponseType } from "../types/common";
import { Team } from "../types/teamTypes";
import { apiSlice } from "./apiSlice";

export const teamsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTeams: builder.query<PageResponseType<Team>, void>({
            query: () => SCORE_BEL_TEAMS,
            transformResponse: (response: any) =>
                camelcaseKeys(response, { deep: true }),
        }),
    }),
    overrideExisting: false,
})

export const { useGetTeamsQuery } = teamsApi