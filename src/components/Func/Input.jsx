import React, { forwardRef } from 'react';

export const Input = (props, ref) => {
  return (
    <textarea
      ref={ref}
      type="text"
      value={props.value}
      onChange={props.change}
      onKeyDown={props.onkey}
      placeholder="Писать сюда"
    ></textarea>
  );
};

export default forwardRef(Input);
