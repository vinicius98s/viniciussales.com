import styled from 'styled-components';

export const ButtonWrapper = styled.button`
    background: ${({ theme, variant, customColor }) =>
        variant === 'primary'
            ? customColor || theme.colors.pink
            : 'transparent'};
    color: ${({ theme, fontColor }) => fontColor || theme.colors.white};
    border: ${({ theme, variant, customColor }) =>
        variant === 'primary'
            ? 'none'
            : customColor
            ? `2px solid ${customColor}`
            : `2px solid ${theme.colors.pink}`};
    margin: ${({ margin }) => margin};
    padding: ${({ theme, padding }) => padding || theme.sizes.mini};
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    border-radius: 10px;
    outline: none;
    font-size: ${({ fontSize }) => fontSize || '20px'};
    cursor: pointer;
`;
