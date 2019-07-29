import React from 'react';
import Proptypes from 'prop-types';
import { graphql } from 'gatsby';

import LayoutContext from 'src/components/LayoutContext';
import SEO from 'src/components/SEO';
import SocialMedia from 'src/components/SocialMedia';
import PostsPreview from 'src/components/PostsPreview';

import {
  StyledH1,
  StyledH2,
  StyledText,
} from 'src/assets/styles';

const Home = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <LayoutContext>
        <StyledH1>Vinicius Sales</StyledH1>
        <StyledH2>
          Front-end developer - React, React Native and Node.js
        </StyledH2>
        <StyledText>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur
          odio, quia quae cupiditate eius est vitae dolorum, iste impedit cumque
          facilis quas sapiente! Placeat mollitia reprehenderit ratione?
          Excepturi, placeat ducimus?
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
            # date(formatString: "MMMM DD, YYYY")
            path
            tags
            previewImage {
              childImageSharp {
                fixed(width: 135, height: 135, quality: 100) {
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