import React, { forwardRef } from 'react';

interface InputProps {
  value: string,
  change: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>,
}

export const Input = forwardRef<HTMLTextAreaElement, InputProps>(({ value, change }, ref) => (
  <textarea
    ref={ref}
    name="msg"
    value={value}
    onChange={change}
    placeholder="Писать сюда"
  />
))

Input.displayName = 'Input'
