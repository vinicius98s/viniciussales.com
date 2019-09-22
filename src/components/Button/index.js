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
  noHover,
  onClick,
  title,
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
    noHover={noHover}
    onClick={onClick}
  >
    {title && title}
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
  noHover: false,
};

Button.propTypes = {
  title: PropTypes.string,
  variant: PropTypes.string,
  fontColor: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  fontSize: PropTypes.string,
  customColor: PropTypes.string,
  customColorHover: PropTypes.string,
  padding: PropTypes.string,
  margin: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      top: PropTypes.string,
      right: PropTypes.string,
      bottom: PropTypes.string,
      left: PropTypes.string,
    }),
  ]),
  borderRadius: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      topLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      topRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      bottomRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      bottomLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ]),
  fontWeight: PropTypes.string,
  noHover: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
