import React, { FC } from 'react';

interface NameChatProps {
  value: string,
  change: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>,
  onkey: React.KeyboardEventHandler<HTMLInputElement>
}

export const Input: FC<NameChatProps> = (props) => (
  <input
    name='nameChart'
    value={props.value}
    onChange={props.change}
    onKeyDown={props.onkey}
    placeholder="Введите название чата"
  />
);