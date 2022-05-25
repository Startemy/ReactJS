import React, { useState, useCallback } from 'react';

import { Input } from './components/Input/Input';
import { Button } from './components/Button/Button';
import { chatsRef } from 'src/services/firebase';
import { push } from 'firebase/database';
import { nanoid } from 'nanoid';

export const FormChat = () => {
  const [name, setName] = useState('');

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.name == 'nameChart') {
        setName(event.target.value);
      }
    },
    []
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name) {
      const id = nanoid();
      push(chatsRef, {
        id,
        messageList: {
          empty: true,
        },
        name,
      });

      setName('');
    }
  };

  return (
    <form className="form-chat" onSubmit={handleSubmit}>
      <Input change={handleChange} value={name} />
      <Button />
    </form>
  );
};
