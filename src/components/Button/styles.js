import styled, { css } from 'styled-components';

export const ButtonWrapper = styled.button`
  transition: ${({ theme }) => theme.transition};
  background: ${({ theme, variant, customColor }) =>
    variant === 'primary' ? customColor || theme.colors.main : 'transparent'};
  border: ${({ theme, variant, customColor }) =>
    variant === 'primary'
      ? 'none'
      : customColor
      ? `2px solid ${customColor}`
      : `2px solid ${theme.colors.main}`};
  font-weight: ${({ theme, fontWeight }) =>
    fontWeight && theme.fonts[fontWeight]};
  margin-top: ${({ theme, margin }) => theme.sizes[margin.top] || margin.top};
  margin-right: ${({ theme, margin }) =>
    theme.sizes[margin.right] || margin.right};
  margin-bottom: ${({ theme, margin }) =>
    theme.sizes[margin.bottom] || margin.bottom};
  margin-left: ${({ theme, margin }) =>
    theme.sizes[margin.left] || margin.left};
  padding: ${({ padding }) => padding};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: ${({ theme, borderRadius }) =>
    borderRadius
      ? typeof borderRadius === 'string'
        ? borderRadius
        : `${theme.sizes[borderRadius.topLeft] || borderRadius.topLeft} ${theme
            .sizes[borderRadius.topRight] || borderRadius.topRight} ${theme
            .sizes[borderRadius.bottomRight] ||
            borderRadius.bottomRight} ${theme.sizes[borderRadius.bottomLeft] ||
            borderRadius.bottomLeft}`
      : theme.sizes.small};
  outline: none;
  font-size: ${({ fontSize }) => fontSize || '18px'};
  color: ${({ theme, fontColor }) => fontColor || theme.colors.white};

  * {
    color: ${({ theme, fontColor }) => fontColor || theme.colors.white};
  }

  ${({ noHover }) =>
    !noHover &&
    css`
      cursor: pointer;

      &:hover {
        background: ${({ theme, customColorHover }) =>
          customColorHover || theme.colors.mainHover};
      }
    `}
`;
