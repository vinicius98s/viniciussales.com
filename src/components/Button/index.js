import React from 'react';
import PropTypes from 'prop-types';

import { ButtonWrapper } from './styles.js';

const Button = ({
    children,
    variant,
    fontColor,
    customColor,
    width,
    height,
    fontSize,
    padding,
    margin,
    borderRadius,
    customColorHover,
}) => (
    <ButtonWrapper
        variant={variant}
        fontColor={fontColor}
        customColor={customColor}
        width={width}
        height={height}
        fontSize={fontSize}
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
    margin: PropTypes.string,
    borderRadius: PropTypes.object || PropTypes.string,
};

export default Button;
