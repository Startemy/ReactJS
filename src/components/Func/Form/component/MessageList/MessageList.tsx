import React, { forwardRef, FC } from 'react';
import { Message } from '../../Form'

interface MessageListProps {
  messageList: Message[],
  author: string,
  deleteMsg: (event: number) => void
  children?: JSX.Element | JSX.Element[];
}

export const MessageList: FC<MessageListProps> = (props, ref) => {
  return (
    <ul ref={ref} className="message-text">
      {props.messageList.map((message) => (
        <li key={message.id} onClick={() => props.deleteMsg(message.id)}>
          {message.msgText}
          <p>
            from {props.author}:{message.created}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default forwardRef(MessageList);
