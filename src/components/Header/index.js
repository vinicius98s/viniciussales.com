import React from 'react';

import Menu from 'src/components/Menu';
import TransitionLink from 'src/components/TransitionLink';
import logoSvg from 'src/assets/images/Logo.svg';

import { HeaderWrapper, Logo } from './styles';

const Header = () => (
  <HeaderWrapper>
    <TransitionLink>
      <Logo src={logoSvg} alt="Vinícius Sales logo" />
    </TransitionLink>
    <Menu />
  </HeaderWrapper>
);

export default Header;
