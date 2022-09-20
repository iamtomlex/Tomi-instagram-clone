import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { PhotosCollectionState, ProfileState } from './types'

const initialState = {
  profile: [],
  photosCollection: [],
  followerCount: 0,
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getProfile: (state: ProfileState, action: PayloadAction<any>) => {
      state.profile = action.payload
    },
    getPhotosCollection: (
      state: PhotosCollectionState,
      action: PayloadAction<any>
    ) => {
      state.photosCollection = action.payload
    },
    updateFollowerCount: (state, action: PayloadAction<number>) => {
      state.followerCount = action.payload
    },
    clearProfile: (state, action: PayloadAction<void>) => {
      state.profile = initialState.profile
      state.photosCollection = initialState.photosCollection
      state.followerCount = initialState.followerCount
    },
  },
})

export const {
  getProfile,
  clearProfile,
  getPhotosCollection,
  updateFollowerCount,
} = profileSlice.actions

export const selectProfileState = (state: RootState) => state.profile

export default profileSlice.reducer
