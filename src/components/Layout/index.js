import React, { useContext, createRef } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import theme from 'src/assets/theme';
import Header from 'src/components/Header';
import ReadingProgress from 'src/components/ReadingProgress';
import Footer from 'src/components/Footer';
import { ThemeContext } from 'src/components/LayoutContext';

import useWindowSize from 'src/utils/useWindowSize';

import { LayoutWrapper, TopLine, ContentWrapper, GlobalStyle } from './styles';

const Layout = ({ children, readingProgress }) => {
  const { colorTheme } = useContext(ThemeContext);
  const [windowWidth] = useWindowSize();

  const layouRef = createRef();

  return (
    <ThemeProvider theme={theme}>
      <>
        {readingProgress ? (
          <ReadingProgress
            target={layouRef}
            backgroundColor={
              colorTheme === 'dark'
                ? theme.colors.darkGrey
                : theme.colors.lightGrey
            }
            progressColor={theme.colors.main}
          />
        ) : (
          <TopLine />
        )}
        <LayoutWrapper
          colorTheme={colorTheme}
          ref={layouRef}
          windowWidth={windowWidth}
        >
          <GlobalStyle />
          <ContentWrapper>
            <Header />
            {children}
          </ContentWrapper>
          <Footer colorTheme={colorTheme} />
        </LayoutWrapper>
      </>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  readingProgress: PropTypes.bool,
};

export default Layout;
