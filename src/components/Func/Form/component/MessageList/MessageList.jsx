import React, { forwardRef } from 'react';

export const MessageList = (props, ref) => {
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
