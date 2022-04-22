import React from 'react';
import PaperAir from 'images/buttons/Paperair.png';

export const Button = ({onButtonClick}) => {
  return (
    <button type="submit" data-testid="btn-send" onClick={onButtonClick}>
      <img src={PaperAir}></img>
    </button>
  );
};
