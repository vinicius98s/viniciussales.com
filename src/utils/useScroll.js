import { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

export default function useScroll() {
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const getCurrentScrollPercentage = () => {
    const { documentElement, body } = document;
    return Math.floor(
      ((documentElement.scrollTop + body.scrollTop) /
        (documentElement.scrollHeight - documentElement.clientHeight)) *
        100
    );
  };

  const eventListener = debounce(() => {
    setScrollX(window.scrollX);
    setScrollY(window.scrollY);
    setScrollPercentage(getCurrentScrollPercentage());
  }, 250);

  useEffect(() => {
    window.addEventListener('scroll', eventListener);

    return () => window.removeEventListener('scroll', eventListener);
  }, []);

  return { scrollX, scrollY, scrollPercentage };
}
