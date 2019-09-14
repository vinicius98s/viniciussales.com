import styled, { css, keyframes } from 'styled-components';

const fadeUpAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(12%);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ExpandBackground = styled.div`
  transition: ${({ theme }) => theme.transition};
  z-index: 997;
  box-shadow: ${({ theme, colorTheme }) =>
    `0 0 0 0 ${
      colorTheme === 'dark' ? theme.colors.darkGrey : theme.colors.lightGrey
    }, 0 0 0 0 ${
      colorTheme === 'dark' ? theme.colors.darkGrey : theme.colors.lightGrey
    }`};
  border-radius: 50%;
  background: transparent;
  position: absolute;
  right: 45px;
  width: 1px;
  height: 1px;

  ${({ expand, theme, colorTheme }) =>
    expand &&
    css`
      box-shadow: 0 0 0 300vw
          ${colorTheme === 'dark'
            ? theme.colors.darkGrey
            : theme.colors.lightGrey},
        0 0 0 300vw
          ${colorTheme === 'dark'
            ? theme.colors.darkGrey
            : theme.colors.lightGrey};
    `};
`;

export const MobileMenuWrapper = styled.div`
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  z-index: 999;
`;

export const MobileMenu = styled.div`
  width: 40px;
  height: 3px;
  background: ${({ theme, active }) =>
    active ? 'transparent' : theme.colors.main};
  transition: ${({ theme }) => theme.transition};
  transform: ${({ active }) => active && 'rotate(180deg)'};
  z-index: 998;

  ::after,
  ::before {
    content: '';
    width: 40px;
    height: 3px;
    display: block;
    background: ${({ theme }) => theme.colors.main};
    position: absolute;
    transition: ${({ theme }) => theme.transition};
  }

  ::after {
    ${({ active }) =>
      active
        ? css`
            transform: rotate(45deg);
          `
        : css`
            margin-top: 10px;
          `}
  }

  ::before {
    ${({ active }) =>
      active
        ? css`
            transform: rotate(135deg);
          `
        : css`
            margin-top: -10px;
          `}
  }
`;

export const MenuUl = styled.ul`
  z-index: 998;

  ${({ active, theme, shouldDisplay }) =>
    active
      ? css`
          display: flex;
          position: absolute;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100vw;
          height: 100vh;
          top: 0;
          left: 0;
          animation: ${fadeUpAnimation} 0.6s ease-in-out;

          li {
            margin: ${theme.sizes.default} 0;
          }
        `
      : css`
          display: ${shouldDisplay ? 'flex' : 'none'};
          align-items: center;
        `};
`;

export const MenuLi = styled.li`
  display: inline-flex;
  margin-left: ${({ marginLeft, theme }) => marginLeft && theme.sizes.big};
  transition: ${({ theme }) => theme.transition};
  position: relative;

  ${({ active }) =>
    active
      ? css`
          ::after {
            content: '';
            display: block;
            position: absolute;
            width: 100%;
            height: 5px;
            top: 30px;
            background: ${({ theme }) => theme.colors.main};
          }
        `
      : css`
          opacity: 0.35;
        `}

  a {
    text-decoration: none;
    font-weight: ${({ theme }) => theme.fonts.bold};
    font-size: 18px;
    color: ${({ theme, colorTheme }) =>
      colorTheme === 'light' ? theme.colors.darkGrey : theme.colors.lightGrey};
  }
`;
