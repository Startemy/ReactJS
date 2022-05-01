import React, { FC } from 'react';

interface NameChatProps {
  value: string,
  change: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>,
}

export const Input: FC<NameChatProps> = ({ value, change }) => (
  <input
    name='nameChart'
    value={value}
    onChange={change}
    placeholder="Введите название чата"
  />
);