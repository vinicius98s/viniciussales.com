import React, { useState, useContext } from 'react';

import { ThemeContext } from 'src/components/LayoutContext';
import TransitionLink from 'src/components/TransitionLink';
import Switch from 'src/components/Switch';

import useWindowSize from 'src/utils/useWindowSize';
import { WIDTH_BREAKPOINT } from 'src/utils/constants';

import {
  MenuUl,
  MenuLi,
  MobileMenu,
  MobileMenuWrapper,
  ExpandBackground,
  BodyOverflowHidden,
} from './styles';

const Menu = () => {
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [windowWidth] = useWindowSize();
  const { colorTheme, toggleTheme } = useContext(ThemeContext);

  const windowLocation =
    typeof window === 'object' ? window.location.pathname : '/';

  const toggleMobileMenuActive = () =>
    setMobileMenuActive(isMenuActive => !isMenuActive);

  return (
    <>
      {mobileMenuActive && <BodyOverflowHidden />}
      <ExpandBackground expand={mobileMenuActive} colorTheme={colorTheme} />
      <MobileMenuWrapper
        aria-label="Toggle menu"
        role="button"
        onClick={toggleMobileMenuActive}
      >
        <MobileMenu active={mobileMenuActive} />
      </MobileMenuWrapper>

      <MenuUl active={mobileMenuActive && windowWidth < WIDTH_BREAKPOINT}>
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
          label="Switch the site theme"
        />
      </MenuUl>
    </>
  );
};

export default Menu;
