import styled from 'styled-components';

export const LayoutWrapper = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    position: relative;
    display: flex;
    justify-content: center;
    padding: ${({ theme }) => theme.sizes.medium} 0;
    background: ${({ theme, colorTheme }) =>
        colorTheme === 'light'
            ? theme.colors.lightGrey
            : theme.colors.darkGrey};
    color: ${({ theme, colorTheme }) =>
        colorTheme === 'light'
            ? theme.colors.darkGrey
            : theme.colors.lightGrey};
    font-family: 'Montserrat', sans-serif;
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
    position: absolute;
    top: 0;
    left: 0;
`;
