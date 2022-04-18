import React, { useState, useCallback, useEffect, useRef } from 'react';
import Author from './component/Author';
import { Button } from './component/Button';
import Input from './component/Input';
import MessageList from './component/MessageList';

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
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [messageList, botAnsw, id]);

  /**Добавляем текст в массив отчищаем value и изменяем id */
  const handleSubmmit = (event) => {
    event.preventDefault();
    if (value && author) {
      event.preventDefault();
      setMessageList([...messageList, dataMsg]);
      setValue('');
      setId(id + 1);
    } else if (!value && author) {
      inputRef.current.style.backgroundColor = 'red';
      inputRef.current.focus();
    } else if (!author && value) {
      authorRef.current.style.borderColor = 'red';
      authorRef.current.focus();
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
      handleSubmmit(event);
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
    <form className="message" onSubmit={handleSubmmit}>
      <MessageList
        ref={msgRef}
        messageList={messageList}
        deleteMsg={deleteMsg}
        author={author}
      />
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
        <Button />
      </div>
    </form>
  );
};
