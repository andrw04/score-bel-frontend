import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../api/authApi'
import authReducer from './authSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { useDispatch } from 'react-redux'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
})

export type AppDispatchType = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
setupListeners(store.dispatch)
export const useAppDispatch: () => AppDispatchType = useDispatch
