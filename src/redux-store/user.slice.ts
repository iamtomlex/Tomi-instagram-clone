import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { UserInfo, UserInfoState } from './types'

const initialState: UserInfoState = {
  // userInfo: {
  //   email: '',
  //   userId: '',
  //   username: '',
  //   fullName: '',
  //   followers: [],
  //   following: [],
  //   dateCreated: '',
  // },

  userInfo: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserInfo: (state: UserInfoState, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload
    },
    clearUserInfo: (state: UserInfoState, action: PayloadAction<void>) => {
      state.userInfo = initialState.userInfo
    },
  },
})

export const { getUserInfo, clearUserInfo } = userSlice.actions

export const selectUserInfoState = (state: RootState) => state.user

export default userSlice.reducer
