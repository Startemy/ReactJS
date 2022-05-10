import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { addMessageWithReply } from 'src/store/chats/actions';
import { Messages } from 'src/store/chats/reducer';
import { AddMessage } from 'src/store/chats/types';

import { Author } from './components/Author/Author';
import { Button } from './components/Button/Button';
import { Input } from './components/Input/Input';


export const Form = () => {
  const [value, setValue] = useState('');
  const [author, setAuthor] = useState('');
  const { chatId } = useParams()
  const dispatch = useDispatch<ThunkDispatch<Messages, void, ReturnType<AddMessage>>>()
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    focus();
  }, []);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.target.name == 'msg') {
      setValue(event.target.value);
      inputRef.current!.style.borderBottomColor = 'grey';
    } else if (event.target.name == 'author') {
      setAuthor(event.target.value);
      authorRef.current!.style.borderColor = 'grey';
    }
  }, [value, author]);

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    wrong(value, author)
    if (value && author && chatId) {
      dispatch(addMessageWithReply(chatId, author, value))
      setValue('');
      focus();
    }
  }, [author, value])

  const wrong = (value: string, author: string) => {
    switch (value && author) {
      case author: if (author == '') {
        authorRef.current!.style.borderColor = 'red', focus();
        authorRef.current!.focus();
      }
      case value: if (value == '') {
        inputRef.current!.style.borderBottomColor = 'red';
        inputRef.current!.focus();
        break;
      }
    }
  }

  return (
    <form
      className="message"
      onSubmit={handleSubmit}>

      <Author
        ref={authorRef}
        change={handleChange}
        value={author}
      />

      <div>
        <Input
          change={handleChange}
          value={value}
          ref={inputRef}
        />
        <Button />
      </div>
    </form>
  );
};
