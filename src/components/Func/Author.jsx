import React, { forwardRef } from 'react';

export const Author = (props, ref) => {
  return (
    <input
      ref={ref}
      type="text"
      name="author"
      value={props.value}
      onChange={props.change}
      onKeyDown={props.onkey}
      placeholder="Введите имя"
    />
  );
};

export default forwardRef(Author);
