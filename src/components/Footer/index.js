import React from 'react';
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';

import EmailSubscription from 'src/components/EmailSubscription';

import { FooterWrapper, MailSubscription } from './styles';

const Footer = ({ colorTheme }) => (
  <FooterWrapper colorTheme={colorTheme}>
    <MailSubscription>
      <div>
        <h1>Join the newsletter</h1>
        <EmailSubscription />
      </div>
      <ReactGA.OutboundLink
        eventLabel="Home page footer note"
        to="https://github.com/vinicius98s/viniciussales.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Found something wrong? <br />
        Help me to maintain this project
      </ReactGA.OutboundLink>
    </MailSubscription>
  </FooterWrapper>
);

Footer.propTypes = {
  colorTheme: PropTypes.string.isRequired,
};

export default Footer;
