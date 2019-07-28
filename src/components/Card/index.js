import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CardWrapper } from './styles';

import { ThemeContext } from '../LayoutContext';

const Card = ({
  children,
  width,
  height,
  customBorderColor,
  customBackgroundColor,
  flexDirection,
  flexBasis,
  flexWrap,
  margin,
  alignItems,
  animation,
}) => {
  const { colorTheme } = useContext(ThemeContext);

  return (
    <CardWrapper
      width={width}
      height={height}
      flexDirection={flexDirection}
      flexBasis={flexBasis}
      flexWrap={flexWrap}
      alignItems={alignItems}
      customBorderColor={customBorderColor}
      colorTheme={colorTheme}
      customBackgroundColor={customBackgroundColor}
      margin={margin}
      animation={animation}
    >
      {children}
    </CardWrapper>
  );
};

Card.defaultProps = {
  animation: false,
  alignItems: 'center',
  flexDirection: 'column',
  margin: {
    top: 'default',
    right: 'default',
    bottom: 'default',
    left: 'default',
  },
};

Card.propTypes = {
  animation: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  customBorderColor: PropTypes.string,
  customBackgroundColor: PropTypes.string,
  flexDirection: PropTypes.string,
  flexBasis: PropTypes.number,
  margin: PropTypes.object,
  flexWrap: PropTypes.string,
  alignItems: PropTypes.string,
};

export default Card;
