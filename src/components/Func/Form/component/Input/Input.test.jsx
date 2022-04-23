import React from 'react';
import Input from './Input';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Button', () => {
  it('render component', () => {
    render(<Input />);
  });

  it('value', () => {
    Input.value = 'Hello';
    expect(Input.value).toEqual('Hello');
  });
});
