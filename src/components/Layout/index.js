import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { LayoutWrapper, TopLine, ContentWrapper } from './styles';

import Header from '../Header';
import { ThemeContext } from '../LayoutContext';

import theme from '../../assets/theme';

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
