import React, { FC, useState, useCallback, useEffect, useRef, useMemo } from "react"
import { nanoid } from 'nanoid';
import { useParams, Navigate } from "react-router-dom";

import { MessageList } from "../components/MessageList/MessageList";
import { Form, Message } from "../components/FormMessage/Form";
import { FormChat } from "../components/FormChat/FormChat";
import { Chats } from "../components/FormChat/FormChat";
import { ChatList } from "../components/FormChat/components/ChatList/ChatList";


const initialMessage: Messages = {
  one: [{
    id: '1',
    msgText: 'Hello',
    author: 'Artem',
    created: '25.05.2022',
  }]
}

interface Messages {
  [key: string]: Message[]
}

export const ChatsPage: FC = () => {
  const [messagesList, setMessagesList] = useState<Messages>(initialMessage);

  /**Читаем ссылку на чат */
  const { chatId } = useParams()

  const msgRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (msgRef && msgRef.current) {
      msgRef.current.scrollTop = msgRef.current.scrollHeight;
    }
  }, [messagesList]);

  /** Получаем чат лист из сообщений */
  const chatList = useMemo(() =>
    Object.entries(messagesList).map((chat) => ({
      id: nanoid(),
      name: chat[0]
    })),
    [Object.entries(messagesList).length])

  /**Добавляем чат */
  const addChat = (chats: Chats) => {
    setMessagesList({
      ...messagesList,
      [chats.name]: []
    })
  }

  /**Добаляем сообщение*/
  const addMessage = useCallback((value: string, author: string) => {
    if (chatId) {
      setMessagesList({
        ...messagesList,
        [chatId]: [
          ...messagesList[chatId],
          {
            id: nanoid(),
            msgText: value,
            author: author,
            created: `${new Date().toLocaleString()}`,
          }]
      })
    }
  }, [chatId, messagesList])

  /**Переделать на удаление по кнопке */
  const deleteChat = useCallback((name: string) => {
    const newMessages: Messages = { ...messagesList };
    delete newMessages[name];
    setMessagesList({
      ...newMessages,
    });
  }, [messagesList]);

  /**Слишком много вызовов API Location или History за короткий промежуток времени. */
  if (chatId && !chatList.find((chat) => chat.name === chatId)) {
    return <Navigate replace to="/chats" />;
  }

  if(chatId){
    return (
      <section className='chats'>
      <div className="chat-list">
        <ChatList
          chatList={chatList}
          deleteChat={deleteChat}
        />
        <FormChat
          addChat={addChat}
        />
      </div>
      <div className="message-list">
        <MessageList
          messageList={chatId ? messagesList[chatId] : []}
          ref={msgRef}
        />
        <Form
          addMessage={addMessage}
        />
      </div>
    </section>
    )
  }

  return (
    <section className='chats'>
      <div className="chat-list">
        <ChatList
          chatList={chatList}
          deleteChat={deleteChat}
        />
        <FormChat
          addChat={addChat}
        />
      </div>
    </section>
  );
}
