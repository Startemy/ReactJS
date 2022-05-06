import { AddChat, AddMessage, DeleteChat } from './types';

export const ADD_CHAT = 'CHATS::ADD_CHAT';
export const DELETE_CHAT = 'CHATS::DELETE_CHAT';
export const ADD_MESSAGE = 'CHATS::ADD_MESSAGE';

export const addChat: AddChat = (chats: string) => ({
  type: ADD_CHAT,
  chats,
});

export const deleteChat: DeleteChat = (name: string) => ({
  type: DELETE_CHAT,
  name,
});

export const addMessage: AddMessage = (chatId: string, author:string, value:string) => ({
  type: ADD_MESSAGE,
  chatId,
  author,
  msgText: value,
});
