import styled from 'styled-components';

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
  margin-top: ${({ theme, margin }) => theme.sizes[margin.top]};
  margin-right: ${({ theme, margin }) => theme.sizes[margin.right]};
  margin-bottom: ${({ theme, margin }) => theme.sizes[margin.bottom]};
  margin-left: ${({ theme, margin }) => theme.sizes[margin.left]};
  padding: ${({ padding }) => padding};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: ${({ theme, borderRadius }) =>
    borderRadius
      ? typeof borderRadius === 'string'
        ? borderRadius
        : `${borderRadius.topLeft} ${borderRadius.topRight} ${borderRadius.bottomRight} ${borderRadius.bottomLeft}`
      : theme.sizes.small};
  outline: none;
  font-size: ${({ fontSize }) => fontSize || '18px'};
  cursor: pointer;
  color: ${({ theme, fontColor }) => fontColor || theme.colors.white};

  * {
    color: ${({ theme, fontColor }) => fontColor || theme.colors.white};
  }

  &:hover {
    background: ${({ theme, customColorHover }) =>
      customColorHover || theme.colors.mainHover};
  }
`;
