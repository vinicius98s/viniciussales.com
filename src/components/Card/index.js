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
    margin,
}) => {
    const { colorTheme } = useContext(ThemeContext);

    return (
        <CardWrapper
            width={width}
            height={height}
            flexDirection={flexDirection}
            customBorderColor={customBorderColor}
            colorTheme={colorTheme}
            customBackgroundColor={customBackgroundColor}
            flexBasis={flexBasis}
            margin={margin}
        >
            {children}
        </CardWrapper>
    );
};

Card.defaultProps = {
    flexDirection: 'column',
};

Card.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    customBorderColor: PropTypes.string,
    customBackgroundColor: PropTypes.string,
    flexDirection: PropTypes.string,
    flexBasis: PropTypes.number,
    margin: PropTypes.object,
};

export default Card;
