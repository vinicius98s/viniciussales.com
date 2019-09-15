import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { ThemeContext } from 'src/components/LayoutContext';

import { TooltipContainer, TooltipText } from './styles';

const Tooltip = ({ children, title, width, onMouseEnter, onMouseLeave }) => {
  const [isHovered, setIsHovered] = useState(true);
  const { colorTheme } = useContext(ThemeContext);

  const handleOnMouseEnter = () => {
    setIsHovered(true);
    if (onMouseEnter && typeof onMouseEnter === 'function') {
      onMouseEnter();
    }
  };

  const handleOnMouseLeave = () => {
    setIsHovered(false);
    if (onMouseLeave && typeof onMouseLeave === 'function') {
      onMouseLeave();
    }
  };

  return (
    <>
      <TooltipContainer
        data-testid="tooltip"
        onMouseEnter={handleOnMouseEnter}
        onFocus={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        onBlur={handleOnMouseLeave}
      >
        {children}
        {isHovered && (
          <TooltipText tooltipWidth={width} colorTheme={colorTheme}>
            {title}
          </TooltipText>
        )}
      </TooltipContainer>
    </>
  );
};

Tooltip.defaultProps = {
  width: 120,
};

Tooltip.propTypes = {
  children: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  width: PropTypes.number,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

export default Tooltip;
