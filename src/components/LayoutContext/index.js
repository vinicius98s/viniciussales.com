import React, { useState } from 'react';
import PropTypes from 'prop-types';

import useLocalStorage from 'src/utils/useLocalStorage';
import Layout from 'src/components/Layout';
import { localStorageThemeColorKey } from 'src/utils/constants';

export const ThemeContext = React.createContext();

const LayoutContext = ({ children, readingProgress }) => {
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
      <Layout readingProgress={readingProgress}>{children}</Layout>
    </ThemeContext.Provider>
  );
};

LayoutContext.defaultProps = {
  readingProgress: false,
};

LayoutContext.propTypes = {
  readingProgress: PropTypes.bool,
};

export default LayoutContext;
