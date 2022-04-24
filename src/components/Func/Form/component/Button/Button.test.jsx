import React from 'react';
import { Button } from './Button';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Button', () => {
  it('render component', () => {
    render(<Button />);
  });

  it('render with snapshot', () => {
    const { asFragment } = render(<Button />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('render multiply components', () => {
    render(
      <>
        <Button />
        <Button />
      </>
    );
    expect(screen.queryAllByRole('button').length).toBe(2);
  });
});
