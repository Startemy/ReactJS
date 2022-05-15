import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { addMessageWithReply, Messages } from 'src/store/chats/chatSlice';
import { AddMessage } from 'src/store/chats/types';

import { Author } from './components/Author/Author';
import { Button } from './components/Button/Button';
import { Input } from './components/Input/Input';

export const Form = () => {
  const [msgText, setMsgText] = useState('');
  const [author, setAuthor] = useState('');
  const { chatId } = useParams();
  const dispatch =
    useDispatch<ThunkDispatch<Messages, void, ReturnType<AddMessage>>>();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current ? inputRef.current.focus() : null;
  }, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      if (event.target.name == 'msg') {
        setMsgText(event.target.value);
        inputRef.current
          ? (inputRef.current.style.borderBottomColor = 'grey')
          : null;
      } else if (event.target.name == 'author') {
        setAuthor(event.target.value);
        authorRef.current
          ? (authorRef.current.style.borderColor = 'grey')
          : null;
      }
    },
    []
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      wrong(msgText, author);
      if (msgText && author && chatId) {
        dispatch(addMessageWithReply({ chatId, author, msgText }));
        setMsgText('');
        inputRef.current?.focus();
      }
    },
    [author, chatId, dispatch, msgText]
  );

  const wrong = (value: string, author: string) => {
    switch (value && author) {
      case author:
        if (author == '' && authorRef.current) {
          (authorRef.current.style.borderColor = 'red'), focus();
          authorRef.current.focus();
        }
        break;
      case value:
        if (value == '' && inputRef.current) {
          inputRef.current.style.borderBottomColor = 'red';
          inputRef.current.focus();
          break;
        }
    }
  };

  return (
    <form className="message" onSubmit={handleSubmit}>
      <Author ref={authorRef} change={handleChange} value={author} />
      <div>
        <Input change={handleChange} value={msgText} ref={inputRef} />
        <Button />
      </div>
    </form>
  );
};
