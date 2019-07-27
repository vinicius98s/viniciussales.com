import React from 'react';
// import { Link } from "gatsby";

import LayoutContext from 'src/components/LayoutContext';
import SEO from 'src/components/SEO';

import {
    PageTitleWrapper,
    StyledH1,
    StyledText,
    DescriptionWrapper,
} from './styles';

const SecondPage = () => (
  <>
    <SEO
      title="Projects"
      keywords={[`Vinicius Sales`, `projects`, `Front-end`, 'react']}
    />
    <LayoutContext>
      <StyledH1>Projects</StyledH1>
      <PageTitleWrapper>
        <DescriptionWrapper>
          <StyledText>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Consequuntur odio, quia quae cupiditate eius est
                        vitae dolorum, iste impedit cumque facilis quas
                        sapiente! Placeat mollitia reprehenderit ratione?
                        Excepturi, placeat ducimus?
          </StyledText>
        </DescriptionWrapper>
      </PageTitleWrapper>
    </LayoutContext>
  </>
);

export default SecondPage;
