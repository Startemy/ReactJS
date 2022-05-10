import React, { useState } from 'react';
import { ThemeContext, defaultContext } from './contexts/ThemeContext';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from './store';
import { AppRoute } from './components/AppRoute';

export const App = () => {
  const [theme, setTheme] = useState(defaultContext.theme);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Provider store={store}>
      <ThemeContext.Provider
        value={{
          theme,
          toggleTheme,
        }}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRoute />
        </PersistGate>
      </ThemeContext.Provider>
    </Provider>
  );
};
