const ADD_CHAT = 'CHATS::ADD_CHAT';
const DELETE_CHAT = 'CHATS::DELETE_CHAT';
const ADD_MESSAGE = 'CHATS::ADD_MESSAGE';

export type ChatsActions =
  | ReturnType<AddChat>
  | ReturnType<DeleteChat>
  | ReturnType<AddMessage>;

export type AddChat = (chats: string) => {
  type: typeof ADD_CHAT;
  chats: string;
};

export type DeleteChat = (name: string) => {
  type: typeof DELETE_CHAT;
  name: string;
};

export type AddMessage = (
  chatId: string,
  author: string,
  msgText: string
) => {
  type: typeof ADD_MESSAGE;
  chatId: string;
  author: string;
  msgText: string;
};
