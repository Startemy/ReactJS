import React, { forwardRef, FC } from 'react';
// import InputUI from '@mui/material/TextField';

interface InputProps {
  value: string,
  change: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>,
  onkey: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>
}

export const Input: FC<InputProps>  = (props, ref) => (
  <textarea
    ref={ref}
    name="msg"
    value={props.value}
    onChange={props.change}
    onKeyDown={props.onkey}
    placeholder="Писать сюда"
  ></textarea>

  /** mui посмотреть как привязать ref */
  // <InputUI
  //   ref={ref}
  //   id="standard-multiline-static"
  //   label="Ваше сообщение"
  //   multiline
  //   rows={2}
  //   variant="standard"
  //   name="msg"
  //   value={props.value}
  //   onChange={props.change}
  //   onKeyDown={props.onkey}
  //   placeholder="Писать сюда">
  // </InputUI>
);

export default forwardRef(Input);
