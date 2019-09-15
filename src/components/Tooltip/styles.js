import styled, { keyframes, css } from 'styled-components';

import hexToRgba from 'src/utils/hexToRgba';

const fadeAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(10%);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const TooltipContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TooltipText = styled.div`
  width: ${({ width }) => `${width}px`};
  background-color: ${({ theme, colorTheme }) =>
    colorTheme === 'light' ? theme.colors.white : theme.colors.semiDarkGrey};
  color: ${({ theme, colorTheme }) =>
    colorTheme === 'light' ? theme.colors.grey : theme.colors.white};
  text-align: center;
  border-radius: 6px;
  padding: 5px 10px;
  position: absolute;
  z-index: 1;
  top: 150%;
  left: 50%;
  margin-left: ${({ width }) => `${width / -2}px`};
  font-size: 11px;
  animation: ${fadeAnimation} 0.3s linear;

  ${({ colorTheme, theme }) =>
    colorTheme === 'light' &&
    css`
      box-shadow: 0 5px 10px 1px ${hexToRgba(theme.colors.darkGrey, 0.1)};
    `};

  ::after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent
      ${({ theme, colorTheme }) =>
        colorTheme === 'light' ? theme.colors.white : theme.colors.semiDarkGrey}
      transparent;
  }
`;
