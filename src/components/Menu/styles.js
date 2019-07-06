import styled, { css } from 'styled-components';

export const MenuUl = styled.ul`
    list-style: none;
    display: flex;
    align-items: center;
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
        font-weight: bold;
        font-size: 18px;
        color: ${({ theme, colorTheme }) =>
            colorTheme === 'light'
                ? theme.colors.darkGrey
                : theme.colors.lightGrey};
    }
`;
