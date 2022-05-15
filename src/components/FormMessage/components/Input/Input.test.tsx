import React from 'react';
import { Input } from './Input';
import { render, screen } from '@testing-library/react';
import 'jest-enzyme';
import '@testing-library/jest-dom';

const TestInput = (props: any) => <Input {...props} />;

describe('Input', () => {
  it('render component', () => {
    render(<TestInput />);
  });

  it('render with snapshot', () => {
    const { asFragment } = render(<TestInput />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('render with snapshot', () => {
    render(<TestInput />);
    expect(screen.getByPlaceholderText('Писать сюда')).toBeTruthy();
  });
});
