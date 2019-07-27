import React, { useContext } from 'react';
import { Link } from 'gatsby';

import { ThemeContext } from 'src/components/LayoutContext';
import Switch from 'src/components/Switch';

import { MenuUl, MenuLi } from './styles';

const Menu = () => {
    const { colorTheme, toggleTheme } = useContext(ThemeContext);

    return (
      <MenuUl>
        <MenuLi active={window.location.pathname === '/'} colorTheme={colorTheme}>
          <Link to="/">Home</Link>
        </MenuLi>
        <MenuLi
          marginLeft
          active={window.location.pathname.includes('projects')}
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
