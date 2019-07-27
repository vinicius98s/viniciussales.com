import React from 'react';

import Menu from 'src/components/Menu';
import logoSvg from 'src/assets/images/Logo.svg';

import { HeaderWrapper, Logo } from './styles';

const Header = () => (
  <HeaderWrapper>
    <Logo src={logoSvg} />
    <Menu />
  </HeaderWrapper>
);

export default Header;
