import { useState, useEffect } from 'react';

type MediaQuery = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const useMediaQuery = (): MediaQuery | null => {
  const [mediaQuery, setMediaQuery] = useState<MediaQuery | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia('(max-width: 639px)').matches) {
        setMediaQuery('xs');
      } else if (window.matchMedia('(min-width: 640px) and (max-width: 767px)').matches) {
        setMediaQuery('sm');
      } else if (window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches) {
        setMediaQuery('md');
      } else if (window.matchMedia('(min-width: 1024px) and (max-width: 1279px)').matches) {
        setMediaQuery('lg');
      } else if (window.matchMedia('(min-width: 1280px)').matches) {
        setMediaQuery('xl');
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return mediaQuery;
};

export default useMediaQuery;