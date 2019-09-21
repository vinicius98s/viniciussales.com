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
    typeof window !== 'undefined' ? window.location.pathname : '/';

  const toggleMobileMenuActive = () =>
    setMobileMenuActive(previousState => !previousState);

  return (
    <>
      {windowWidth < WIDTH_BREAKPOINT && (
        <>
          {mobileMenuActive && <BodyOverflowHidden />}
          <ExpandBackground expand={mobileMenuActive} colorTheme={colorTheme} />
          <MobileMenuWrapper role="button" onClick={toggleMobileMenuActive}>
            <MobileMenu active={mobileMenuActive} />
          </MobileMenuWrapper>
        </>
      )}

      <MenuUl
        shouldDisplay={windowWidth > WIDTH_BREAKPOINT}
        active={mobileMenuActive}
      >
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
    </>
  );
};

export default Menu;
