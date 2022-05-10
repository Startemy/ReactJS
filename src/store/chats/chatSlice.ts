// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// export interface Message {
//   id: string,
//   msgText: string,
//   author: string,
//   created: string,
// }

// export interface Messages {
//   [key: string]: Message[]
// }

// export interface Chats {
//   id: string,
//   name: string,
// }

// const initialState: Messages = {
//   first: [{
//     id: '1',
//     msgText: 'Hello Artem',
//     author: 'Artem',
//     created: '06.05.2022',
//   }]
// }

// const chatsSlice = createSlice({
//   name: 'chats',
//   initialState,
//   reducers: {
//     addChat: (state, action) => { },
//     deleteChat: (state, action) => { },
//     addMessage: (state, action) => {
//     },
//   },
// });




// export const { addChat, deleteChat, addMessage } = chatsSlice.actions;
// export const chatReducer = chatsSlice.reducer;