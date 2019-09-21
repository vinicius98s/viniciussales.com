import React, { useContext } from 'react';
import { FaLinkedinIn, FaTwitter, FaGithub, FaEnvelope } from 'react-icons/fa';

import { SocialMediaWrapper, Link } from './styles';

import { ThemeContext } from '../LayoutContext';

const SocialMedia = () => {
  const { colorTheme } = useContext(ThemeContext);

  return (
    <SocialMediaWrapper>
      <p>Get in touch:</p>
      <Link
        eventLabel="Social Media - Linkedin"
        to="https://www.linkedin.com/in/vinicius-sales/"
        target="_blank"
        rel="noopener noreferrer"
        colorTheme={colorTheme}
        aria-label="Follow me on LinkedIn"
      >
        <FaLinkedinIn />
      </Link>
      <Link
        eventLabel="Social Media - Github"
        to="https://github.com/vinicius98s"
        target="_blank"
        rel="noopener noreferrer"
        colorTheme={colorTheme}
        aria-label="Follow me on Github"
      >
        <FaGithub />
      </Link>
      <Link
        eventLabel="Social Media - Twitter"
        to="https://twitter.com/vinicius98s"
        target="_blank"
        rel="noopener noreferrer"
        colorTheme={colorTheme}
        aria-label="Follow me on Twitter"
      >
        <FaTwitter />
      </Link>
      <Link
        eventLabel="Social Media - Email"
        to="mailto:vinicius.2010.s@gmail.com"
        colorTheme={colorTheme}
        aria-label="Send me an email"
      >
        <FaEnvelope />
      </Link>
    </SocialMediaWrapper>
  );
};

export default SocialMedia;
