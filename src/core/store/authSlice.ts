import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import { SCORE_BEL_ACCESS, SCORE_BEL_REFRESH } from '../constants/api'

export interface AuthState {
    username: string | null
    access: string | null
    refresh: string | null
    isAuthenticated: boolean
}

const initialState: AuthState = {
    username: null,
    refresh: null,
    access: null,
    isAuthenticated: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTokens: (
            state,
            action: PayloadAction<{ refresh: string; access: string }>,
        ) => {
            localStorage.setItem(SCORE_BEL_ACCESS, action.payload.access)
            localStorage.setItem(SCORE_BEL_REFRESH, action.payload.refresh)

            state.refresh = action.payload.refresh
            state.access = action.payload.access
        },
        setUser: (state, action: PayloadAction<{ username: string }>) => {
            console.log('setUser', action.payload.username)
            localStorage.setItem(
                'user',
                JSON.stringify({
                    username: action.payload.username,
                }),
            )
            state.username = action.payload.username
        },
        removeTokens: (state) => {
            console.log('logout')
            localStorage.removeItem(SCORE_BEL_ACCESS)
            localStorage.removeItem(SCORE_BEL_REFRESH)
        },
    },
})

export const selectAuth = (state: RootState) => state.auth

export const { setTokens, setUser, removeTokens } = authSlice.actions

export default authSlice.reducer