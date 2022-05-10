import { combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import { profileReducer } from './profile/slice'
import { chatReducer } from './chats/reducer'
import storage from 'redux-persist/lib/storage'

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})
export type StoreState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['profile'],
}

const rootReducer = combineReducers({
  profile: profileReducer,
  chats: chatReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({  
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false
  }),
  devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)
