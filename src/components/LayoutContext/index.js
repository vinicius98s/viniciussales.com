import React, { useState } from 'react';

import Layout from '../Layout';

import useLocalStorage from '../../utils/useLocalStorage';
import constants from '../../utils/constants';

export const ThemeContext = React.createContext();
export const CurrentPageContext = React.createContext();

const LayoutContext = () => {
    const [localStorageColorTheme, setLocalStorageColorTheme] = useLocalStorage(
        constants.localStorageThemeColorKey,
        'light'
    );
    const [colorTheme, setColorTheme] = useState(localStorageColorTheme);
    const [currentPage, setCurrentPage] = useState('home');

    const toggleTheme = () => {
        const newColorTheme = colorTheme === 'light' ? 'dark' : 'light';
        setColorTheme(newColorTheme);
        setLocalStorageColorTheme(newColorTheme);
    };

    const handleCurrentPage = currentPage => setCurrentPage(currentPage);

    return (
        <ThemeContext.Provider value={{ colorTheme, toggleTheme }}>
            <CurrentPageContext.Provider
                value={{ currentPage, handleCurrentPage }}
            >
                <Layout />
            </CurrentPageContext.Provider>
        </ThemeContext.Provider>
    );
};

export default LayoutContext;
