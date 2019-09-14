import styled, { createGlobalStyle } from 'styled-components';
import { WIDTH_BREAKPOINT } from 'src/utils/constants';

export const LayoutWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  padding: ${({ theme, windowWidth }) =>
      windowWidth > WIDTH_BREAKPOINT ? theme.sizes.medium : theme.sizes.default}
    0;
  background: ${({ theme, colorTheme }) =>
    colorTheme === 'light' ? theme.colors.lightGrey : theme.colors.darkGrey};
  color: ${({ theme, colorTheme }) =>
    colorTheme === 'light' ? theme.colors.darkGrey : theme.colors.lightGrey};
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1175px;
  padding: ${({ theme }) => `0 ${theme.sizes.default}`};
`;

export const TopLine = styled.div`
  width: 100%;
  height: 5px;
  background: ${({ theme }) => theme.colors.main};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const Normalize = createGlobalStyle`
  *,
  *:after,
  *:before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: none;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }
`;
