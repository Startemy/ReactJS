import React, { useState, useCallback, FC } from 'react';
import { nanoid } from 'nanoid';

import { Input } from './components/Input/Input';
import { Button } from './components/Button/Button';

export interface Chats {
  id: string,
  name: string,
}

interface FormChatProps {
  addChat: (chats: Chats) => void;
}

export const FormChat: FC<FormChatProps> = ({ addChat }) => {
  const [name, setName] = useState('');

  const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.target.name == 'nameChart') {
      setName(event.target.value);
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name) {
      addChat({ 
        id: nanoid(),
        name,
      })
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