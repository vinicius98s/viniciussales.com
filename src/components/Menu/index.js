import React, { useContext } from 'react';

import { ThemeContext } from 'src/components/LayoutContext';
import TransitionLink from 'src/components/TransitionLink';
import Switch from 'src/components/Switch';

import { MenuUl, MenuLi } from './styles';

const Menu = () => {
  const { colorTheme, toggleTheme } = useContext(ThemeContext);

  const windowLocation =
    typeof window !== 'undefined' ? window.location.pathname : '/';

  return (
    <MenuUl>
      <MenuLi active={windowLocation === '/'} colorTheme={colorTheme}>
        <TransitionLink>Home</TransitionLink>
      </MenuLi>
      <MenuLi
        marginLeft
        active={windowLocation.includes('projects')}
        colorTheme={colorTheme}
      >
        <TransitionLink direction="left" to="/projects">
          Projects
        </TransitionLink>
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
