import React from 'react';
import PropTypes from 'prop-types';

import { ButtonWrapper } from './styles';

const Button = ({
  children,
  variant,
  fontColor,
  fontSize,
  fontWeight,
  customColor,
  width,
  height,
  padding,
  margin,
  borderRadius,
  customColorHover,
}) => (
  <ButtonWrapper
    variant={variant}
    fontColor={fontColor}
    fontSize={fontSize}
    fontWeight={fontWeight}
    customColor={customColor}
    width={width}
    height={height}
    padding={padding}
    margin={margin}
    borderRadius={borderRadius}
    customColorHover={customColorHover}
  >
    {children}
  </ButtonWrapper>
);

Button.defaultProps = {
  variant: 'primary',
  padding: '5px 25px',
  margin: {
    top: 'none',
    right: 'none',
    bottom: 'none',
    left: 'none',
  },
};

Button.propTypes = {
  variant: PropTypes.string,
  fontColor: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  fontSize: PropTypes.string,
  customColor: PropTypes.string,
  customColorHover: PropTypes.string,
  padding: PropTypes.string,
  margin: PropTypes.object || PropTypes.string,
  borderRadius: PropTypes.object || PropTypes.string,
  fontWeight: PropTypes.string,
};

export default Button;