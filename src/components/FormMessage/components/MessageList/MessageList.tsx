import React, { useRef, useEffect, FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { StoreState } from 'src/store';
import { selectChat } from 'src/store/chats/selectors';

const MessageList: FC = () => {
  const { chatId } = useParams();
  const msgRef = useRef<HTMLUListElement>(null);
  const messagesList = useSelector((state: StoreState) =>
    selectChat(state, chatId || '')
  );

  useEffect(() => {
    if (msgRef && msgRef.current) {
      msgRef.current.scrollTop = msgRef.current.scrollHeight;
    }
  }, [messagesList]);

  return (
    <ul ref={msgRef} className="message-text">
      {messagesList.map((message) => (
        <li key={message.id}>
          {message.msgText}
          <p>from {message.author}</p>
        </li>
      ))}
    </ul>
  );
};

MessageList.displayName = 'MessageList';
export { MessageList };
