import React, { useContext, useEffect } from 'react';
import { FaLinkedinIn, FaTwitter, FaGithub } from 'react-icons/fa';
import ReactGA from 'react-ga';

import { SocialMediaWrapper, Link } from './styles';

import { ThemeContext } from '../LayoutContext';

const SocialMedia = () => {
  const { colorTheme } = useContext(ThemeContext);

  useEffect(() => {
    const eventListener = event =>
      ReactGA.event({
        category: 'Social media',
        action: 'Click',
        label: event.target.parentNode.id,
      });

    const socialMedias = [
      ...document.querySelector('#linkedin'),
      ...document.querySelector('#github'),
      ...document.querySelector('#twitter'),
    ];

    socialMedias.forEach(socialMedia =>
      socialMedia.addEventListener('click', eventListener)
    );

    return () =>
      socialMedias.forEach(socialMedia =>
        socialMedia.removeEventListener('click', eventListener)
      );
  }, []);

  return (
    <SocialMediaWrapper>
      <Link
        href="https://www.linkedin.com/in/vinicius-sales-57b8b9143/"
        target="_blank"
        rel="noopener noreferrer"
        colorTheme={colorTheme}
        id="linkedin"
      >
        <FaLinkedinIn />
      </Link>
      <Link
        href="https://github.com/vinicius98s"
        target="_blank"
        rel="noopener noreferrer"
        colorTheme={colorTheme}
        id="github"
      >
        <FaGithub />
      </Link>
      <Link
        href="https://twitter.com/vinicius98s"
        target="_blank"
        rel="noopener noreferrer"
        colorTheme={colorTheme}
        id="twitter"
      >
        <FaTwitter />
      </Link>
    </SocialMediaWrapper>
  );
};

export default SocialMedia;
