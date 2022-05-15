import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleProfile } from 'src/store/profile/profileSlice';
import { selectVisible } from 'src/store/profile/selectors';

export const About: FC = () => {
  const visible = useSelector(selectVisible);
  const dispatch = useDispatch();
  return (
    <>
      <h2>About</h2>
      <input type="checkbox" checked={visible} readOnly />
      <button onClick={() => dispatch(toggleProfile())}>change visible</button>
    </>
  );
};
