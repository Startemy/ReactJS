import React, { FC, Suspense, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Form } from 'components/FormMessage/Form';
import { FormChat } from 'components/FormChat/FormChat';
import { selectChats } from 'src/store/chats/selectors';
import { onValue, push } from 'firebase/database';
import { getChatsById, getMessageListById } from 'src/services/firebase';
import { nanoid } from 'nanoid';

const ChatList = React.lazy(() =>
  import('components/FormChat/components/ChatList/ChatList').then((module) => ({
    default: module.ChatList,
  }))
);
const MessageList = React.lazy(() =>
  import('components/FormMessage/components/MessageList/MessageList').then(
    (module) => ({
      default: module.MessageList,
    })
  )
);
export interface LastMessage {
  id: string;
  author: string;
  msgText: string;
}
export const ChatsPage: FC<LastMessage> = () => {
  const { chatId } = useParams();
  const chatList = useSelector(selectChats);

  useEffect(() => {
    if (chatId) {
      onValue(getChatsById(chatId), (snapshot) => {
        const chat = snapshot.val();
        if (Object.entries(chat.messageList)[0].indexOf('empty')) {
          const lastMessage = Object.entries<LastMessage>(chat.messageList)[
            Object.entries(chat.messageList).length - 2
          ][1];
          if (lastMessage.author !== 'Ботя') {
            push(getMessageListById(chatId), {
              author: 'Ботя',
              id: nanoid(),
              msgText: 'Hello! Im Ботя',
            });
          }
        }
      });
    }
  }, [chatId]);

  if (chatId && !chatList[chatId]) {
    return <Navigate replace to="/chats" />;
  }

  return (
    <section className="chats">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="chat-list">
          <ChatList />
          <FormChat />
        </div>
      </Suspense>

      {chatId && (
        <Suspense fallback={<div>Loading...</div>}>
          <div className="message-list">
            <MessageList />
            <Form />
          </div>
        </Suspense>
      )}
    </section>
  );
};

export default ChatsPage;
