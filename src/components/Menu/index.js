import React, { useContext } from 'react';
import { Link } from 'gatsby';

import Switch from '../Switch';

import { MenuUl, MenuLi } from './styles';

import { CurrentPageContext } from '../LayoutContext';
import { ThemeContext } from '../LayoutContext';

const Menu = () => {
    const { currentPage } = useContext(CurrentPageContext);
    const { colorTheme, toggleTheme } = useContext(ThemeContext);

    return (
        <MenuUl>
            <MenuLi active={currentPage === 'home'} colorTheme={colorTheme}>
                <Link to="/">Home</Link>
            </MenuLi>
            <MenuLi
                marginLeft
                active={currentPage === 'projects'}
                colorTheme={colorTheme}
            >
                <Link to="/projects">Projects</Link>
            </MenuLi>
            <Switch
                handleOnToggle={toggleTheme}
                checked={colorTheme === 'dark'}
                colorTheme={colorTheme}
            />
        </MenuUl>
    );
};

export default Menu;
