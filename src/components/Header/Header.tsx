/* eslint-disable linebreak-style */
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { changeAuth } from 'src/store/profile/profileSlice';
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
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
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
          <button className="login" onClick={() => dispatch(changeAuth(false))}>
            Logout
          </button>
        ) : (
          <Link to="/signin">
            <button className="login">SingIn</button>
          </Link>
        )}
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};
