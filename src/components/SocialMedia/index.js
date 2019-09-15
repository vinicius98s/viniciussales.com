import React, { useContext } from 'react';
import { FaLinkedinIn, FaTwitter, FaGithub } from 'react-icons/fa';

import { SocialMediaWrapper, Link } from './styles';

import { ThemeContext } from '../LayoutContext';

const SocialMedia = () => {
  const { colorTheme } = useContext(ThemeContext);

  return (
    <SocialMediaWrapper>
      <Link
        eventLabel="Social Media - Linkedin"
        to="https://www.linkedin.com/in/vinicius-sales-57b8b9143/"
        target="_blank"
        rel="noopener noreferrer"
        colorTheme={colorTheme}
      >
        <FaLinkedinIn />
      </Link>
      <Link
        eventLabel="Social Media - Github"
        to="https://github.com/vinicius98s"
        target="_blank"
        rel="noopener noreferrer"
        colorTheme={colorTheme}
      >
        <FaGithub />
      </Link>
      <Link
        eventLabel="Social Media - Twitter"
        to="https://twitter.com/vinicius98s"
        target="_blank"
        rel="noopener noreferrer"
        colorTheme={colorTheme}
      >
        <FaTwitter />
      </Link>
    </SocialMediaWrapper>
  );
};

export default SocialMedia;
