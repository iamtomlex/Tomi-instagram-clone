import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { Photos, PhotosState } from './types'

const initialState: PhotosState = {
  photos: null,
}

const photoSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    getFollowedUserPhotos: (
      state: PhotosState,
      action: PayloadAction<any[]>
    ) => {
      state.photos = action.payload
    },
    clearPhotos: (state: PhotosState, action: PayloadAction<void>) => {
      state.photos = initialState.photos
    },
  },
})

export const { getFollowedUserPhotos, clearPhotos } = photoSlice.actions

export const selectPhotosState = (state: RootState) => state.photos

export default photoSlice.reducer
