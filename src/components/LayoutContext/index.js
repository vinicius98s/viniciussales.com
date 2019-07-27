import React, { useState } from 'react';
import PropTypes from 'prop-types';

import useLocalStorage from 'src/utils/useLocalStorage';
import constants from 'src/utils/constants';
import Layout from 'src/components/Layout';

export const ThemeContext = React.createContext();

const LayoutContext = ({ children }) => {
    const [localStorageColorTheme, setLocalStorageColorTheme] = useLocalStorage(
        constants.localStorageThemeColorKey,
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

LayoutContext.propTypes = {
  children: PropTypes.object,
}

export default LayoutContext;
