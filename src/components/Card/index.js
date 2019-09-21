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
  post,
  postBreakpoint,
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
      post={post}
      postBreakpoint={postBreakpoint}
    >
      {children}
    </CardWrapper>
  );
};

Card.defaultProps = {
  width: '100%',
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
  postBreakpoint: PropTypes.number,
  post: PropTypes.bool,
  animation: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  customBorderColor: PropTypes.string,
  customBackgroundColor: PropTypes.string,
  flexDirection: PropTypes.string,
  flexBasis: PropTypes.number,
  margin: PropTypes.shape({
    top: PropTypes.string,
    right: PropTypes.string,
    bottom: PropTypes.string,
    left: PropTypes.string,
  }),
  flexWrap: PropTypes.string,
  alignItems: PropTypes.string,
};

export default Card;
