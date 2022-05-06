import { Reducer } from 'redux';
import { ChatsActions } from './types';
import { nanoid } from 'nanoid';

import { ADD_CHAT, DELETE_CHAT, ADD_MESSAGE } from './actions';

export interface Message {
  id: string,
  msgText: string,
  author: string,
  created: string,
}

export interface Messages {
  [key: string]: Message[]
}

const initialMessag: Messages = {
  first: [{
    id: '1',
    msgText: 'Hello Artem',
    author: 'Artem',
    created: '06.05.2022',
  }]
}

export const chatReducer: Reducer<Messages, ChatsActions> = (
  state = initialMessag,
  action
) => {
  switch (action.type) {
    case ADD_CHAT: {
      return {
        ...state,
        [action.chats]: [],
      };
    }
    case DELETE_CHAT: {
      const chats = { ...state };
      delete chats[action.name];
      return chats;
    }
    case ADD_MESSAGE: {
      return {
        ...state,
        [action.chatId]: [
          ...state[action.chatId],
          {
            id: nanoid(),
            msgText: action.msgText,
            author:  action.author,
            created: `${new Date().toLocaleString()}`,
          },
        ],
      };
    }

    default:
      return state;
  }
};
