import React from 'react';
import PaperAir from 'images/buttons/Paperair.png';

export const Button = () => (
  <button type="submit" data-testid="btn-send">
    <img src={PaperAir} alt="Отправить сообщение"></img>
  </button>
);
