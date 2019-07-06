import styled, { css } from 'styled-components';
import hexToRgba from 'src/utils/hexToRgba';

export const CardWrapper = styled.div`
    position: relative;
    flex-basis: ${({ flexBasis }) => flexBasis && `${flexBasis}%`};
    flex-wrap: ${({ flexWrap }) => flexWrap};
    align-items: ${({ alignItems }) => alignItems};
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    display: flex;
    flex-direction: ${({ flexDirection }) => flexDirection};
    ${({ theme, colorTheme }) =>
        colorTheme === 'light' &&
        css`
            box-shadow: 0 5px 20px ${hexToRgba(theme.colors.darkGrey, 0.15)};
        `};
    background: ${({ theme, colorTheme, customBackgroundColor }) =>
        customBackgroundColor || colorTheme === 'light'
            ? theme.colors.lightGrey
            : theme.colors.semiDarkGrey};
    color: ${({ theme, colorTheme }) =>
        colorTheme === 'light' ? theme.colors.darkGrey : theme.colors.white};
    border-top: 5px solid
        ${({ theme, customBorderColor }) =>
            customBorderColor || theme.colors.main};
    border-radius: 15px;
    margin-top: ${({ theme, margin }) => theme.sizes[margin.top]};
    margin-right: ${({ theme, margin }) => theme.sizes[margin.right]};
    margin-bottom: ${({ theme, margin }) => theme.sizes[margin.bottom]};
    margin-left: ${({ theme, margin }) => theme.sizes[margin.left]};
    padding: ${({ theme }) => theme.sizes.default};
`;
