import React from 'react';

import LayoutContext from 'src/components/LayoutContext';
import SEO from 'src/components/SEO';

import { StyledH1, StyledH2 } from 'src/assets/styles';

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <LayoutContext>
      <StyledH1>404</StyledH1>
      <StyledH2>Something went wrong</StyledH2>
    </LayoutContext>
  </>
);

export default NotFoundPage;
