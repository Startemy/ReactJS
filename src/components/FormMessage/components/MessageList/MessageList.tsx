import React, { forwardRef } from 'react';
import { Message } from 'components/FormMessage/Form'

interface MessageListProps {
  messageList: Message[],
}

export const MessageList = forwardRef<HTMLUListElement, MessageListProps>(({ messageList }, ref) => {
  return (
    <ul ref={ref} className="message-text">
      {messageList.map((message) => (
        <li key={message.id}>
          {message.msgText}
          <p>
            from {message.author}:{message.created}
          </p>
        </li>
      ))}
    </ul>
  );
})
