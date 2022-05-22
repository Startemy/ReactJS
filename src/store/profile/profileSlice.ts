import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProfileState {
  auth: boolean;
  visible: boolean;
  name: string;
}

const initialState: ProfileState = {
  auth: false,
  visible: true,
  name: 'default name',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    changeAuth: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload;
    },
    toggleProfile: (state) => {
      state.visible = !state.visible;
    },
    changeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { toggleProfile, changeName, changeAuth } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
