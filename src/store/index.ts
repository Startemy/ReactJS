import { createStore, compose, combineReducers } from 'redux';

import { profileReducer, ProfileState } from './profile/reducer';
import { chatReducer, Messages } from './chats/reducer';

export const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export interface StoreState {
  profile: ProfileState;
  chats: Messages;
}

export const store = createStore(
  combineReducers<StoreState>({
    profile: profileReducer,
    chats: chatReducer,
  }),
  composeEnhancers()
);
