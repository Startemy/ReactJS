import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { onValue } from 'firebase/database';
import { chatsRef } from 'src/services/firebase';
import { Message } from './types';

export interface ChatState {
  [key: string]: {
    id: string;
    name: string;
    messageList: {
      [key: string]: Message;
    };
  };
}

const initialState: ChatState = {};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setState(state, action: PayloadAction<{ state: ChatState }>) {
      return { ...action.payload.state };
    },
  },
});

export const initialMessagesFB = createAsyncThunk(
  'chats/initialMessagesFB',
  (data, { dispatch }) => {
    onValue(chatsRef, (snapshot) => {
      const newState = snapshot.val();
      dispatch(setState({ state: newState }));
    });
  }
);

export const { setState } = chatsSlice.actions;
export const chatReducer = chatsSlice.reducer;
