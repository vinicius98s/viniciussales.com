import React from 'react';
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';

import EmailSubscription from 'src/components/EmailSubscription';
import SocialMedia from 'src/components/SocialMedia';
import useWindowSize from 'src/utils/useWindowSize';

import {
  FooterContainer,
  FooterWrapper,
  MailSubscription,
  Contact,
} from './styles';
import { FOOTER_BREAKPOINT } from './constants';

const Footer = ({ colorTheme }) => {
  const [width] = useWindowSize();

  return (
    <FooterContainer colorTheme={colorTheme}>
      <FooterWrapper>
        <MailSubscription>
          <h1>Join the newsletter</h1>
          <EmailSubscription />
        </MailSubscription>
        <Contact>
          <SocialMedia noMarginTop alignTextRight={width > FOOTER_BREAKPOINT} />
          <ReactGA.OutboundLink
            eventLabel="Home page footer note"
            to="https://github.com/vinicius98s/viniciussales.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Help me to maintain this project
          </ReactGA.OutboundLink>
        </Contact>
      </FooterWrapper>
    </FooterContainer>
  );
};

Footer.propTypes = {
  colorTheme: PropTypes.string.isRequired,
};

export default Footer;
