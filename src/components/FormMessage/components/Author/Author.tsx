import React, { forwardRef } from 'react';

interface AuthorProps {
  value: string,
  change: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>,
}

export const Author = forwardRef<HTMLInputElement, AuthorProps>(({ value, change }, ref) => (
  <input
    ref={ref}
    name="author"
    value={value}
    onChange={change}
    placeholder="Введите имя"
  />
))
