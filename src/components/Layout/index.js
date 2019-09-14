import React, { useContext, createRef } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import theme from 'src/assets/theme';
import Header from 'src/components/Header';
import ReadingProgress from 'src/components/ReadingProgress';
import { ThemeContext } from 'src/components/LayoutContext';

import useWindowSize from 'src/utils/useWindowSize';

import { LayoutWrapper, TopLine, ContentWrapper, Normalize } from './styles';

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
          <Normalize />
          <ContentWrapper>
            <Header />
            {children}
          </ContentWrapper>
        </LayoutWrapper>
      </>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  readingProgress: PropTypes.bool,
};

export default Layout;
