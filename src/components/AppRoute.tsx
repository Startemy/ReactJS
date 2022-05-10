import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Header } from 'components/Header/Header';
import { ChatsPage } from '../pages/Chats';
import { Home } from '../pages/Home';
import { Profile } from '../pages/Profile';
import { AboutWithConnect } from '../pages/About';

export const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route index element={<Home />} />
          <Route path='/profile' element={<Profile />} />

          <Route path='/chats'>
            <Route index element={<ChatsPage />} />
            <Route
              path=':chatId'
              element={
                <ChatsPage />}
            />
          </Route>
          <Route path='/about' element={<AboutWithConnect />} />
        </Route>

        <Route path='*' element={<h1>404 Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
