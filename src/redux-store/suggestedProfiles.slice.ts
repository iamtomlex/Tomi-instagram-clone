import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { SuggestedProfilesState } from './types'

const initialState: SuggestedProfilesState = {
  suggestedProfiles: null,
}

const suggestedProfilesSlice = createSlice({
  name: 'suggestedProfiles',
  initialState,
  reducers: {
    getSuggestedProfiles: (
      state: SuggestedProfilesState,
      action: PayloadAction<any>
    ) => {
      state.suggestedProfiles = action.payload
    },
    clearSuggestedProfiles: (
      state: SuggestedProfilesState,
      action: PayloadAction<void>
    ) => {
      state.suggestedProfiles = initialState.suggestedProfiles
    },
  },
})

export const { getSuggestedProfiles,clearSuggestedProfiles } = suggestedProfilesSlice.actions

export const selectSuggestedProfilesState = (state: RootState) =>
  state.suggestedProfiles

export default suggestedProfilesSlice.reducer
