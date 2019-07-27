import React, { useContext } from 'react';
import { Link } from 'gatsby';

import { ThemeContext } from 'src/components/LayoutContext';
import Switch from 'src/components/Switch';

import { MenuUl, MenuLi } from './styles';

const Menu = () => {
  const { colorTheme, toggleTheme } = useContext(ThemeContext);

  const windowLocation =
    typeof window !== 'undefined' ? window.location.pathname : '';

  return (
    <MenuUl>
      <MenuLi active={windowLocation === '/'} colorTheme={colorTheme}>
        <Link to="/">Home</Link>
      </MenuLi>
      <MenuLi
        marginLeft
        active={windowLocation.includes('projects')}
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
