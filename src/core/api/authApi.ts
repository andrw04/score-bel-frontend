import { apiSlice } from './apiSlice'
import { TagTypes } from '../constants/api'

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation<
            { access: string; refresh: string },
            { email: string; password: string }
        >({
            query: (body) => {
                return {
                    url: 'user/sign-in/',
                    method: 'POST',
                    body: JSON.stringify(body),
                }
            },
            invalidatesTags: [TagTypes.USER],
        }),
        signUp: builder.mutation<
            { access: string; refresh: string },
            { username: string; email: string; password: string }
        >({
            query: (body) => {
                return {
                    url: 'user/sign-up/',
                    method: 'POST',
                    body: JSON.stringify(body),
                }
            },
        }),
        getUserProfile: builder.query<{ username: string }, void>({
            query: () => {
                return {
                    url: 'user/profile/',
                    method: 'GET',
                }
            },
            providesTags: [TagTypes.USER],
        }),
    }),
    overrideExisting: false,
})

export const { useSignInMutation, useSignUpMutation, useGetUserProfileQuery } =
    authApi
