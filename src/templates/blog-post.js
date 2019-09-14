import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Img from 'gatsby-image';

import LayoutContext from 'src/components/LayoutContext';
import PostTags from 'src/components/PostTags';

import {
  MainInfoWrapper,
  PostTitle,
  PostDescription,
  PostInfoWrapper,
  Post,
} from './styles';

const BlogPostContent = ({ data }) => {
  const { markdownRemark: post } = data;
  const { frontmatter: postDetails } = post;

  return (
    <LayoutContext readingProgress>
      <Helmet title={postDetails.title} />
      <MainInfoWrapper>
        <Img fluid={postDetails.featuredImage.childImageSharp.fluid} />
        <PostInfoWrapper>
          <PostTitle>{postDetails.title}</PostTitle>
          <PostDescription>{postDetails.description}</PostDescription>
          <PostTags tags={postDetails.tags} />
        </PostInfoWrapper>
      </MainInfoWrapper>
      <Post dangerouslySetInnerHTML={{ __html: post.html }} />
    </LayoutContext>
  );
};

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        description
        path
        title
        tags
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 1250, maxHeight: 250, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

BlogPostContent.propTypes = {
  data: PropTypes.object,
};

export default BlogPostContent;
