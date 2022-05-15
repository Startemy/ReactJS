import {
  createSlice,
  nanoid,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';

export interface Message {
  id: string;
  msgText: string;
  author: string;
  created: string;
}

export interface Messages {
  [key: string]: Message[];
}

export interface Chats {
  id: string;
  name: string;
}

const initialState: Messages = {
  first: [
    {
      id: '1',
      msgText: 'Hello Artem',
      author: 'Artem',
      created: '06.05.2022',
    },
  ],
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<{ name: string }>) => {
      state[action.payload.name] = [];
    },
    deleteChat: (state, action: PayloadAction<{ name: string }>) => {
      delete state[action.payload.name];
    },
    addMessage: (
      state,
      action: PayloadAction<{ chatId: string; author: string; msgText: string }>
    ) => {
      state[action.payload.chatId].push({
        id: nanoid(),
        author: action.payload.author,
        msgText: action.payload.msgText,
        created: `${new Date().toLocaleString()}`,
      });
    },
  },
});

let timeout: NodeJS.Timeout;

export const addMessageWithReply = createAsyncThunk(
  'chats/addMessageWithReply',
  async (
    // eslint-disable-next-line prettier/prettier
    { chatId, author, msgText }: { chatId: string, author: string, msgText: string },
    { dispatch }
  ) => {
    dispatch(addMessage({ chatId, author, msgText }));

    if (author !== 'Ботя') {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        dispatch(
          addMessage({
            chatId,
            author: 'Ботя',
            msgText: `Привет, ${author}! Я Ботя`,
          })
        );
      }, 1000);
    }
  }
);

export const { addChat, deleteChat, addMessage } = chatsSlice.actions;
export const chatReducer = chatsSlice.reducer;
