import React, { FC } from 'react';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import { ChatList } from './components/FormChat/components/ChatList/ChatList';

import { Header } from './components/Header/Header';
import { ChatsPage } from './pages/Chats';
import { Home } from './pages/Home';


export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route index element={<Home />} />

          <Route path='/chats'>
            <Route index element={<ChatsPage />} />
            <Route 
            path=':chatId' 
            element={
            <ChatsPage />} 
            />
          </Route>
        </Route>

        <Route path='*' element={<h1>404 Page not found</h1>} />
      </Routes>
    </BrowserRouter >
  );
};
