import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { TransitionState } from 'gatsby-plugin-transition-link';
import { withTheme } from 'styled-components';

import TransitionLink from 'src/components/TransitionLink';
import Button from 'src/components/Button';
import PostTags from 'src/components/PostTags';
import Card from 'src/components/Card';

import {
  PostsPreviewWrapper,
  PostTitle,
  PostDescription,
  PostDetails,
  ButtonWrapper,
  PostDetailsText,
} from './styles';

const PostsPreview = ({ posts, theme }) => (
  <TransitionState>
    {({ transitionStatus }) => (
      <PostsPreviewWrapper>
        {posts.map(({ node: post }, index) => {
          const { frontmatter: postDetails } = post;

          return (
            <Card
              key={post.id}
              flexBasis={48}
              flexDirection="row"
              animation={
                transitionStatus === 'entering' ||
                transitionStatus === 'entered'
              }
              margin={{
                right: index % 2 === 0 && 'default',
                bottom: 'medium',
              }}
            >
              <PostDetails>
                <Img fixed={postDetails.previewImage.childImageSharp.fixed} />
                <PostDetailsText>
                  <PostTitle>{postDetails.title}</PostTitle>
                  <PostDescription>{postDetails.description}</PostDescription>
                  <PostTags
                    tags={postDetails.tags}
                    justifyContent="flex-start"
                  />
                </PostDetailsText>
              </PostDetails>
              <ButtonWrapper>
                <TransitionLink direction="up" to={postDetails.path}>
                  <Button
                    width="100%"
                    padding={`${theme.sizes.small} 0`}
                    fontWeight="bold"
                    borderRadius={{
                      topLeft: 0,
                      topRight: 0,
                      bottomLeft: theme.sizes.small,
                      bottomRight: theme.sizes.small,
                    }}
                  >
                    Continue reading
                  </Button>
                </TransitionLink>
              </ButtonWrapper>
            </Card>
          );
        })}
      </PostsPreviewWrapper>
    )}
  </TransitionState>
);

PostsPreview.propTypes = {
  theme: PropTypes.object,
  posts: PropTypes.array.isRequired,
};

export default withTheme(PostsPreview);