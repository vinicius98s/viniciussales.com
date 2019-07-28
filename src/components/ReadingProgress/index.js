import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { ProgressBar, ProgressBarWrapper } from './styles';

const ReadingProgress = ({
  children,
  target,
  progressColor,
  backgroundColor,
}) => {
  const [readingProgress, setReadingProgress] = useState(0);

  const scrollListener = () => {
    if (!target.current) {
      return;
    }

    const element = target.current;
    const totalHeight =
      element.clientHeight - element.offsetTop - window.innerHeight;
    const windowScrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (windowScrollTop === 0) {
      return setReadingProgress(0);
    }

    if (windowScrollTop > totalHeight) {
      return setReadingProgress(100);
    }

    setReadingProgress((windowScrollTop / totalHeight) * 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollListener);
    return () => window.removeEventListener('scroll', scrollListener);
  });

  return (
    <ProgressBarWrapper backgroundColor={backgroundColor}>
      <ProgressBar width={readingProgress} progressColor={progressColor}>
        {children}
      </ProgressBar>
    </ProgressBarWrapper>
  );
};

ReadingProgress.propTypes = {
  progressColor: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  target: PropTypes.object.isRequired,
};

export default ReadingProgress;
