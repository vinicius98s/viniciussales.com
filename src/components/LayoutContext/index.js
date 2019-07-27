import React, { useState } from 'react';

import useLocalStorage from 'src/utils/useLocalStorage';
import { localStorageThemeColorKey } from 'src/utils/constants';
import Layout from 'src/components/Layout';

export const ThemeContext = React.createContext();

const LayoutContext = ({ children }) => {
  const [localStorageColorTheme, setLocalStorageColorTheme] = useLocalStorage(
    localStorageThemeColorKey,
    'light'
  );
  const [colorTheme, setColorTheme] = useState(localStorageColorTheme);

  const toggleTheme = () => {
    const newColorTheme = colorTheme === 'light' ? 'dark' : 'light';
    setColorTheme(newColorTheme);
    setLocalStorageColorTheme(newColorTheme);
  };

  return (
    <ThemeContext.Provider value={{ colorTheme, toggleTheme }}>
      <Layout>{children}</Layout>
    </ThemeContext.Provider>
  );
};

export default LayoutContext;
