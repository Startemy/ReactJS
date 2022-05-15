import React, { useRef, useEffect, FC } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import { Message } from 'src/store/chats/chatSlice';
import { selectChats } from 'src/store/chats/selectors';

interface MessageListProps {
  messages: Message[];
}

const MessageList: FC<MessageListProps> = ({ messages }) => {
  const messagesList = useSelector(selectChats, shallowEqual);
  const msgRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (msgRef && msgRef.current) {
      msgRef.current.scrollTop = msgRef.current.scrollHeight;
    }
  }, [messagesList]);

  return (
    <ul ref={msgRef} className="message-text">
      {messages.map((message) => (
        <li key={message.id}>
          {message.msgText}
          <p>
            from {message.author}:{message.created}
          </p>
        </li>
      ))}
    </ul>
  );
};

MessageList.displayName = 'MessageList';
export { MessageList };
