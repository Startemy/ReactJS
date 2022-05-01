import React, { useState, useCallback, useEffect, useRef, FC } from 'react';
import Author from './component/Author/Author';
import { Button } from './component/Button/Button';
import Input from './component/Input/Input';
import MessageList from './component/MessageList/MessageList';
import { FormChat } from '../../FormChat/FormChat';

export interface Message {
  id: number,
  msgText: string,
  author: string,
  created: string,
}

export const Form: FC = () => {
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [value, setValue] = useState('');
  const [id, setId] = useState(1);
  const [author, setAuthor] = useState('');

  const inputRef = useRef<HTMLDivElement>(null);
  const msgRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);

  const focus = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };
  const authorFocus = () => {
    if (authorRef && authorRef.current) {
      authorRef.current.focus();
    }
  };
  useEffect(() => {
    focus();
  }, []);

  useEffect(() => {
    if (msgRef && msgRef.current) {
      msgRef.current.scrollTop = msgRef.current.scrollHeight;
    }
  });

  /**Ответ бота */
  useEffect(() => {
    if (
      messageList.length > 0 &&
      messageList[messageList.length - 1].author !== 'Бот'
    ) {
      const timeout = setTimeout(() => {
        setMessageList([...messageList,
        {
          id: id,
          msgText: `Привет ${author}, я Бот`,
          author: 'Бот',
          created: `${new Date().toLocaleString()}`
        },
        ]);

        setId(id + 1);
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [messageList, id]);

  /**Добавляем текст в массив отчищаем value и изменяем id */
  const handleSubmmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value && author) {

      event.preventDefault();
      setMessageList([...messageList, {
        id: id,
        msgText: value,
        author: author,
        created: `${new Date().toLocaleString()}`,
      }
      ]);

      setValue('');
      setId(id + 1);
      focus();
    } else if (!value && author) {
      inputRef.current!.style.borderBottomColor = 'red';
      focus();
    } else if (!author && value) {
      authorRef.current!.style.borderColor = 'red';
      authorFocus();
    } else {
      inputRef.current!.style.borderBottomColor = 'red';
      authorRef.current!.style.borderColor = 'red';
      focus();
    }
  };

  /**Получаем текст из textarea */
  const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | undefined>) => {
    if (event.target.name == 'msg') {
      setValue(event.target.value);
      inputRef.current!.style.borderBottomColor = 'grey';
    } else if (event.target.name == 'author') {
      setAuthor(event.target.value);
      authorRef.current!.style.borderColor = 'grey';
    }
  }, []);

  /**Меняем состояние нажатия Enter в textareа */
  const onKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter" && !event.shiftKey) {
      handleSubmmit(event)
    }
  };
  
  /**Переделать на удаление по кнопке */
  const deleteMsg = (event: number) => {
    let find = messageList.findIndex((item) => item.id == event);

    setMessageList([
      ...messageList.slice(0, find),
      ...messageList.slice(find + 1),
    ]);
  };

  return (
    <section className='chats'>
      <div>
        <FormChat />
      </div>
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
    </section>
  );
};
