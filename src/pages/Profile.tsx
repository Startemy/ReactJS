import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ThemeContext } from 'contexts/ThemeContext';
import { changeName, toggleProfile } from 'src/store/profile/profileSlice';
import { selectName, selectVisible } from 'src/store/profile/selectors';
import { onValue, update } from 'firebase/database';
import { userRef } from 'src/services/firebase';

export const Profile: FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [value, setValue] = useState('');

  const visible = useSelector(selectVisible);
  const name = useSelector(selectName);

  const dispatch = useDispatch();

  useEffect(() => {
    onValue(userRef, (snapshot) => {
      const user = snapshot.val();
      dispatch(changeName(user.name || ''));
    });
  }, [dispatch]);

  const handleChangeName = async () => {
    update(userRef, {
      name: value,
    });
  };

  return (
    <>
      <h2>Profile</h2>
      <div>
        <p>{theme === 'light' ? '🌞' : '🌙'} </p>
        <button onClick={toggleTheme}>change theme</button>
      </div>
      <hr />
      <div>
        <p>{name}</p>
        <input type="checkbox" checked={visible} readOnly />
        <button onClick={() => dispatch(toggleProfile())}>
          change visible
        </button>
        <br />

        <input
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <button onClick={handleChangeName}>change name</button>
      </div>
    </>
  );
};
