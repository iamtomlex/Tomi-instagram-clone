import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { UserInfoState } from './types'

const initialState: UserInfoState = {
  userInfo: {
    email: '',
    userId: '',
    username: '',
    fullName: '',
    followers: [],
    following: [],
    dateCreated: '',
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserInfo: (
      state: UserInfoState,
      action: PayloadAction<UserInfoState>
    ) => {
      state.userInfo = action.payload.userInfo
    },
  },
})

export const { getUserInfo } = userSlice.actions

export const selectUserInfoState = (state: RootState) => state.user

export default userSlice.reducer
