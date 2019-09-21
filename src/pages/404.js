import React from 'react';

import LayoutContext from 'src/components/LayoutContext';
import SEO from 'src/components/SEO';

import error404 from 'src/assets/images/error-404.svg';

import { StyledH2, ErrorIcon, NotFoundWrapper } from 'src/assets/styles';

const NotFoundPage = () => (
  <>
    <SEO title="Not found" />
    <LayoutContext>
      <NotFoundWrapper>
        <ErrorIcon src={error404} />
        <div>
          <h1>404</h1>
          <StyledH2>Sorry, something went wrong</StyledH2>
        </div>
      </NotFoundWrapper>
    </LayoutContext>
  </>
);

export default NotFoundPage;
