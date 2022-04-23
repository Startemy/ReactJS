import React from 'react';
import { Button } from './Button';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@storybook/testing-library';
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

  it('button click with userEvent', async () => {
    const mockHandler = jest.fn();
    render(<Button onButtonClick={mockHandler} />);
    await userEvent.click(screen.getByTestId('btn-send'));
    expect(mockHandler).toBeCalledTimes(1);
  });

  it('button async click', async () => {
    const mockHandler = jest.fn();
    render(<Button onButtonClick={() => setTimeout(mockHandler, 1000)} />);
    await userEvent.click(screen.getByTestId('btn-send'));
    await waitFor(() => expect(mockHandler).toHaveBeenCalledTimes(1), {
      timeout: 1100,
    });
  });
});
