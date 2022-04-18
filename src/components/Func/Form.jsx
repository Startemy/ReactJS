import React, { useState, useCallback, useEffect, useRef } from 'react';
import Author from './Author';
import { Button } from './Button';
import Input from './Input';

export const Form = () => {
  const [messageList, setMessageList] = useState([]);
  const [value, setValue] = useState('');
  const [dataMsg, setDataMsg] = useState({});
  const [id, setId] = useState(1);
  const [author, setAuthor] = useState('');
  const [botAnsw, setBotAnsw] = useState({});

  const inputRef = useRef(null);
  const msgRef = useRef(null);
  const authorRef = useRef(null);

  useEffect(() => {
    msgRef.current.scrollTop = msgRef.current.scrollHeight;
  });

  useEffect(() => {
    setDataMsg({
      id: id,
      msgText: value,
      author: author,
      created: `${new Date().toLocaleString()}`,
    });
    setBotAnsw({
      id: id,
      msgText: `Привет ${author}, я Бот`,
      author: 'Бот',
      created: `${new Date().toLocaleString()}`,
    });
  }, [author, value, id]);

  /**Ответ бота */
  useEffect(() => {
    if (
      messageList.length > 0 &&
      messageList[messageList.length - 1].author !== 'Бот'
    ) {
      const timeout = setTimeout(() => {
        setMessageList([...messageList, botAnsw]);
        setId(id + 1);
        console.log(messageList);
      }, 1500);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [messageList, botAnsw, id]);

  /**Добавляем текст в массив отчищаем value и изменяем id */
  const handleClick = () => {
    if (value && author) {
      setMessageList([...messageList, dataMsg]);
      setValue('');
      setId(id + 1);
    } else if (!value && author) {
      inputRef.current.style.backgroundColor = 'red';
    } else if (!author && value) {
      authorRef.current.style.borderColor = 'red';
    } else {
      inputRef.current.style.backgroundColor = 'red';
      authorRef.current.style.borderColor = 'red';
    }
  };

  /**Получаем текст из textarea */
  const handleChange = useCallback((event) => {
    if (event.target.name == 'msg') {
      setValue(event.target.value);
      inputRef.current.style.background = 'none';
    } else if (event.target.name == 'author') {
      setAuthor(event.target.value);
      authorRef.current.style.borderColor = 'grey';
    }
  }, []);

  /**Меняем состояние нажатия Enter в textareа */
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
      <ul ref={msgRef} className="message-text">
        {messageList.map((message) => (
          <li key={message.id} onClick={() => deleteMsg(message.id)}>
            {message.msgText}
            <p>{message.created}</p>
          </li>
        ))}
      </ul>

      <Author
        ref={authorRef}
        change={handleChange}
        value={author}
        onkey={onKey}
      />

      <div>
        <Input
          change={handleChange}
          value={value}
          ref={inputRef}
          onkey={onKey}
        />
        <Button click={handleClick} />
      </div>
    </form>
  );
};
