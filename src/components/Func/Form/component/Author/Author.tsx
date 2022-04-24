import React, { forwardRef, FC } from 'react';

interface AuthorProps {
  value: string,
  change: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>,
  onkey: React.KeyboardEventHandler<HTMLInputElement>
}

export const Author: FC<AuthorProps> = (props, ref) => (
  <input
    ref={ref}
    name="author"
    value={props.value}
    onChange={props.change}
    onKeyDown={props.onkey}
    placeholder="Введите имя"
  />
);

export default forwardRef(Author);
