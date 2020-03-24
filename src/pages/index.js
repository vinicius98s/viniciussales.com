import React from 'react';
import Proptypes from 'prop-types';
import { graphql } from 'gatsby';
import { FaReact, FaNodeJs, FaVuejs } from 'react-icons/fa';
import ReactGA from 'react-ga';

import LayoutContext from 'src/components/LayoutContext';
import SEO from 'src/components/SEO';
import SocialMedia from 'src/components/SocialMedia';
import PostsPreview from 'src/components/PostsPreview';
import Tooltip from 'src/components/Tooltip';

import {
  StyledH1,
  StyledH2,
  TechInfo,
  Techs,
  StyledText,
} from 'src/assets/styles';

const Home = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;

  const sendGAEvent = label =>
    ReactGA.event({
      category: 'Tooltip',
      action: 'Mouse enter',
      label,
    });

  return (
    <>
      <SEO
        title="Home"
        keywords={[
          `Vinicius Sales`,
          `front-end`,
          'development',
          'React',
          'Vue',
          'JavaScript',
          'Nodejs',
        ]}
      />
      <LayoutContext>
        <StyledH1 mainColor>Vinícius Sales</StyledH1>
        <TechInfo>
          <StyledH2 noMargin>A web developer currently working with:</StyledH2>
          <Techs>
            <Tooltip
              title="React and React Native"
              onMouseEnter={() => sendGAEvent('React')}
            >
              <FaReact />
            </Tooltip>
            <Tooltip
              title="Some CRUD's"
              onMouseEnter={() => sendGAEvent('Node')}
            >
              <FaNodeJs />
            </Tooltip>
            <Tooltip
              title="Yeah, basically JavaScript"
              onMouseEnter={() => sendGAEvent('Vue')}
            >
              <FaVuejs />
            </Tooltip>
          </Techs>
        </TechInfo>
        <StyledText>
          I&apos;m a 21 years old front-end developer currently working at{' '}
          <a
            href="https://app.organizecloudlabs.com/organize"
            target="_blank"
            rel="noopener noreferrer"
          >
            Organize Cloud Labs
          </a>{' '}
          and also graduating at Anhembi Morumbi for Digital Design.<br />
          <br />
          Here you will find everything related to this journey, hope you like
          it.
        </StyledText>
        <SocialMedia />
        <PostsPreview posts={posts} />
      </LayoutContext>
    </>
  );
};

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 200)
          id
          frontmatter {
            title
            description
            path
            tags
            previewImage {
              childImageSharp {
                fixed(width: 200, height: 200, quality: 100) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`;

Home.propTypes = {
  data: Proptypes.object,
};

export default Home;
