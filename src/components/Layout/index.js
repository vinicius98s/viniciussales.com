import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components';

import theme from 'src/assets/theme';
import Header from 'src/components/Header';
import { ThemeContext } from 'src/components/LayoutContext';

import { LayoutWrapper, TopLine, ContentWrapper } from './styles';

import './normalize.css';

const Layout = ({ children }) => {
  const { colorTheme } = useContext(ThemeContext);

  return (
    <ThemeProvider theme={theme}>
      <LayoutWrapper colorTheme={colorTheme}>
        <ContentWrapper>
          <TopLine />
          <Header />
          {children}
        </ContentWrapper>
      </LayoutWrapper>
    </ThemeProvider>
  );
};

export default Layout;
