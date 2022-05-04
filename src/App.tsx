import React, { FC, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeContext, defaultContext } from './contexts/ThemeContext';

import { Header } from './components/Header/Header';
import { ChatsPage } from './pages/Chats';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';


export const App: FC = () => {
  const [theme, setTheme] = useState(defaultContext.theme);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{
      theme,
      toggleTheme,
    }}>
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
          </Route>

          <Route path='*' element={<h1>404 Page not found</h1>} />
        </Routes>
      </BrowserRouter >
    </ThemeContext.Provider>
  );
};
