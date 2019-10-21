import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import ReactGA from 'react-ga';

import LayoutContext from 'src/components/LayoutContext';
import SEO from 'src/components/SEO';
import PostTags from 'src/components/PostTags';

import useScroll from 'src/utils/useScroll';

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

  const { scrollPercentage } = useScroll();

  const sendGAEvent = percentage => {
    const eventsCondition = {
      initial: percentage > 10 && percentage < 25,
      middle: percentage > 26 && percentage < 50,
      end: percentage > 75 && percentage <= 100,
    };

    switch (true) {
      case eventsCondition.initial:
      case eventsCondition.middle:
      case eventsCondition.end:
        return ReactGA.event({
          category: 'Posts',
          action: 'Scroll',
          label: `${postDetails.title} - ${percentage}%`,
          nonInteraction: true,
        });
      default:
        return false;
    }
  };

  sendGAEvent(scrollPercentage);

  return (
    <>
      <SEO title={postDetails.title} keywords={postDetails.tags} />
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
    </>
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
