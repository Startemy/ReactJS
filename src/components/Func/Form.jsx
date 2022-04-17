import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Button } from './Button';
import Input from './Input';

export const Form = () => {
  const [value, setValue] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [visible, setVisible] = useState(true);
  const [id, setId] = useState(1);
  const [author, setAuthor] = useState('');
  const inputRef = useRef(null);
  const msgRef = useRef(null)

  const valueId = {
    id: id,
    msgText: value,
    author: author,
    created: `${new Date().toLocaleString()}`,
  };

  useEffect(() => {
    inputRef.current.focus();
    msgRef.current.scrollTop = msgRef.current.scrollHeight;
  });

  /**Добавляем текст в массив отчищаем value и изменяем id */
  const handleClick = () => {
    if (value) {
      setMessageList([...messageList, valueId]);
      setValue('');
      setAuthor('');
      setId(id + 1);
    }
  };

  /**Получаем текст из textarea */
  const handleChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  /**Меняем состояние нажатия Enter в textare */
  const onKey = (event) => {
    if (event.which == 13 && !event.shiftKey) {
      event.preventDefault();
      handleClick();
    }
  };

  const deleteMsg = (event) => {
    let find = messageList.findIndex((item) => item.id == event);
    setMessageList([
      ...messageList.slice(0, find),
      ...messageList.slice(find + 1),
    ]);
  };

  return (
    <form className="message" action="#">
      {visible && (
        <ul ref={ msgRef } className="message-text">
          {messageList.map((message) => (
            <li key={message.id} onClick={() => deleteMsg(message.id)}>
              {message.msgText}
              <p>{message.created}</p>
            </li>
          ))}
        </ul>
      )}

      <div>
        <Input
          change={handleChange}
          value={value}
          ref={inputRef}
          onkey={onKey}
        />
        <Button click={handleClick} />
      </div>

      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide messages' : 'show messages'}
      </button>
    </form>
  );
};
