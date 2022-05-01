import React, { useState, useCallback, useEffect, useRef, FC } from 'react';

import { Author } from './components/Author/Author';
import { Button } from './components/Button/Button';
import { Input } from './components/Input/Input';


export interface Message {
  id: string,
  msgText: string,
  author: string,
  created: string,
}

interface FormProps {
  addMessage: (valeu: string, author: string) => void;
}

export const Form: FC<FormProps> = ({ addMessage }) => {
  const [value, setValue] = useState('');
  const [author, setAuthor] = useState('');

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    focus();
  }, []);


  /**Получаем текст из textarea */
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
    if (value && author) {
      addMessage(value, author)
      setValue('');
      focus();
    }
  },[author, value])

  const wrong = (value: string, author: string) => {
    if (!value && author) {
      inputRef.current!.style.borderBottomColor = 'red';
      inputRef.current!.focus();
    } else if (!author && value) {
      authorRef.current!.style.borderColor = 'red', focus();;
      authorRef.current!.focus();
    } else  if (!author && !value){
      inputRef.current!.style.borderBottomColor = 'red';
      authorRef.current!.style.borderColor = 'red';
      inputRef.current!.focus();
    }
  }

  return (
    <>
      <form className="message" onSubmit={handleSubmit}>
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
    </>
  );
};
