import styled, { createGlobalStyle } from 'styled-components';
import { WIDTH_BREAKPOINT, CONTAINER_MAX_WIDTH } from 'src/utils/constants';

export const LayoutWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: ${({ theme, windowWidth }) =>
    windowWidth > WIDTH_BREAKPOINT ? theme.sizes.medium : theme.sizes.default};
  background: ${({ theme, colorTheme }) =>
    colorTheme === 'light' ? theme.colors.lightGrey : theme.colors.darkGrey};
  color: ${({ theme, colorTheme }) =>
    colorTheme === 'light' ? theme.colors.darkGrey : theme.colors.lightGrey};
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: ${CONTAINER_MAX_WIDTH}px;
  padding: 0 ${({ theme }) => theme.sizes.default};
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
