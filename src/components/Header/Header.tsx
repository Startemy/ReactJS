/* eslint-disable linebreak-style */
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { logOut } from 'src/services/firebase';
import { selectAuth } from 'src/store/profile/selectors';

const navigate = [
  {
    id: 1,
    to: '/',
    name: 'home',
  },
  {
    id: 2,
    to: '/profile',
    name: 'profile',
  },
  {
    id: 3,
    to: '/chats',
    name: 'chat',
  },
  {
    id: 4,
    to: '/about',
    name: 'about',
  },
  {
    id: 5,
    to: '/articles',
    name: 'articles',
  },
];

export const Header: FC = () => {
  const auth = useSelector(selectAuth);
  const [error, setError] = useState('');

  const handleSignOut = async () => {
    setError('');
    try {
      await logOut();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <>
      <header className="header">
        <ul>
          {navigate.map((link) => (
            <li key={link.id}>
              <NavLink
                to={link.to}
                style={({ isActive }) => ({
                  color: isActive ? 'green' : 'black',
                })}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
        {auth ? (
          <button className="login" onClick={handleSignOut}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/signin">
              <button className="login">SingIn</button>
            </Link>
            <Link to="/signup">
              <button className="login">SingUp</button>
            </Link>
          </>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};
