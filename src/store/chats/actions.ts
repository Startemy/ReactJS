import { Dispatch } from 'react';
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

export const addMessage: AddMessage = (chatId: string, author: string, msgText: string) => ({
  type: ADD_MESSAGE,
  chatId,
  author,
  msgText
});

let timeout: NodeJS.Timeout;

export const addMessageWithReply =
  (chatId: string, author: string, msgText: string) => 
    (dispatch: Dispatch<ReturnType<AddMessage>>) => {
      dispatch(addMessage(chatId, author, msgText));

      if (author !== 'Ботя') {
        if (timeout) {
          clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
          dispatch(
            addMessage(chatId, 'Ботя', `Привет, ${author}! Я Ботя`)
          );
        }, 1000);
      }
    };