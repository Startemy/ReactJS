import React, { useState, useCallback } from 'react';

import { Input } from './components/Input/Input';
import { Button } from './components/Button/Button';
import { useDispatch } from 'react-redux';
import { addChat } from 'src/store/chats/actions';

export const FormChat = () => {
  const [name, setName] = useState('')
  const dispatch = useDispatch()

  const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.target.name == 'nameChart') {
      setName(event.target.value)
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name) {
      dispatch(addChat(name))
      setName('');
    }
  }

  return (
    <form className="form-chat" onSubmit={handleSubmit}>
      <Input
        change={handleChange}
        value={name}
      />
      <Button />
    </form>
  );
}