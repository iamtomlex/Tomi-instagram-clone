import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './auth.slice'
import userReducer from './user.slice'
import logger from 'redux-logger'
import suggestedProfilesReducer from './suggestedProfiles.slice'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  suggestedProfiles: suggestedProfilesReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
