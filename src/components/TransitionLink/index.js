import React from 'react';
import PropTypes from 'prop-types';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import { withTheme } from 'styled-components';

const TransitionLink = ({
  theme,
  color,
  direction,
  to,
  duration,
  children,
}) => (
  <AniLink
    cover
    duration={duration}
    bg={theme.colors[color]}
    direction={direction}
    to={to}
  >
    {children}
  </AniLink>
);

TransitionLink.defaultProps = {
  direction: 'right',
  duration: 0.8,
  color: 'main',
  to: '/',
};

TransitionLink.propTypes = {
  theme: PropTypes.object,
  direction: PropTypes.string,
  duration: PropTypes.number,
  to: PropTypes.string,
  color: PropTypes.string,
};

export default withTheme(TransitionLink);