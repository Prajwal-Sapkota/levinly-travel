import { useEffect } from 'react';

const SITE_NAME = 'Levinly Travel';

const usePageTitle = (pageTitle) => {
  useEffect(() => {
    if (pageTitle) {
      document.title = `${pageTitle} | ${SITE_NAME}`;
    } else {
      document.title = SITE_NAME;
    }
  }, [pageTitle]);
};

export default usePageTitle;
