import React, { useState, useCallback, FC, useMemo } from 'react';
import { nanoid } from 'nanoid';

import { Input } from './components/Input/Input';
import { ChatList } from './components/ChatList/ChatList'
import { Button } from './components/Button/Button';
import { number } from 'prop-types';


export interface Chats {
  id: string,
  name: string,
  chat?: string | number,
}

export const FormChat: FC = () => {
  const [chatNames, setChatNames] = useState<Chats[]>([]);
  const [chatList, setChatList] = useState([]);
  const [name, setName] = useState('');

  const handleSubmmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name) {
      event.preventDefault();
      setChatNames([...chatNames, {
        id: nanoid(),
        name: name,
      }
      ]);
      setName('');
    };
  }

  const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | undefined>) => {
    if (event.target.name == 'nameChart') {
      setName(event.target.value);
    }
  }, []);

  const onKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter" && !event.shiftKey) {
      handleSubmmit(event)
    }
  };

  /**сделать кнопу для удаления */
  const deleteChat = (event: number) => {
    let find = chatNames.findIndex((item) => Number(item.id) == event);

    setChatNames([
      ...chatNames.slice(0, find),
      ...chatNames.slice(find + 1),
    ]);
  };

  return (
    <form className="form-chat" onSubmit={handleSubmmit}>
      <div className='mui-list'>
        <ChatList
          chatList={chatNames}
        />
      </div>
      <Input
        change={handleChange}
        value={name}
        onkey={onKey}
      />
      <Button />
    </form>
  );

}