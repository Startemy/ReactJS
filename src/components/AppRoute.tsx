import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Header } from 'components/Header/Header';
import { ChatsPage } from '../pages/Chats';
import { Home } from '../pages/Home';
import { Profile } from '../pages/Profile';
import { About } from '../pages/About';
import { Articles } from 'src/pages/Articles';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { SignIn } from 'src/pages/SignIn';

export const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="/chats">
            <Route
              index
              element={
                <PrivateRoute>
                  <ChatsPage />
                </PrivateRoute>
              }
            />
            <Route
              path=":chatId"
              element={
                <PrivateRoute>
                  <ChatsPage />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="articles" element={<Articles />} />
          <Route
            path="signin"
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />
        </Route>

        <Route path="*" element={<h1>404 Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
