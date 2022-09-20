import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { AuthState, User } from './types'

const initialState: AuthState = {
  isLogged: false,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: AuthState, action: PayloadAction<User>) => {
      state.isLogged = true
      state.user = action.payload
    },
    logout: (state: AuthState, action: PayloadAction<void>) => {
      state.isLogged = false
      state.user = initialState.user
    },
  },
})

export const { login, logout } = authSlice.actions

export const selectAuthState = (state: RootState) => state.auth

export default authSlice.reducer