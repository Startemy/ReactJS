import React, { Suspense } from "react"
import { useParams, Navigate } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";

import { Form } from "components/FormMessage/Form";
import { FormChat } from "components/FormChat/FormChat";
import { selectChatList, selectChats } from "src/store/chats/selectors";

const ChatList = React.lazy(() =>
  import('components/FormChat/components/ChatList/ChatList').then((module) => ({
    default: module.ChatList,
  }))
);
const MessageList = React.lazy(() =>
  import('components/FormMessage/components/MessageList/MessageList').then((module) => ({
    default: module.MessageList,
  }))
);

export const ChatsPage = () => {

  const chatList = useSelector(
    selectChatList, 
    (prev, next) => prev && next ? prev.length === next.length : false
  )

  const messagesList = useSelector(selectChats, shallowEqual)

  const { chatId } = useParams()

  if (chatId && !chatList.find((chat) => chat.name === chatId)) {
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

      {chatId &&
        <Suspense fallback={<div>Loading...</div>}>
          <div className="message-list">
            <MessageList
              messages={chatId ? messagesList[chatId] : []}
            />
            <Form />
          </div>
        </Suspense>
      }
    </section >
  )
}
