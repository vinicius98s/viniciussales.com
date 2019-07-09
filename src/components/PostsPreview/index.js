import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import { withTheme } from 'styled-components';

import Button from '../Button';
import PostTags from '../PostTags';
import Card from '../Card';

import {
    PostsPreviewWrapper,
    PostTitle,
    PostDescription,
    PostDetails,
    ButtonWrapper,
    PostDetailsText,
} from './styles';

const PostsPreview = ({ posts, theme }) => (
    <PostsPreviewWrapper>
        {posts.map(({ node: post }, index) => {
            const { frontmatter: postDetails } = post;

            return (
                <Card
                    key={post.id}
                    margin={{
                        right: index % 2 === 0 && 'default',
                        bottom: 'medium',
                    }}
                    flexBasis={48}
                    flexDirection="row"
                >
                    <PostDetails>
                        <Img
                            fixed={
                                postDetails.previewImage.childImageSharp.fixed
                            }
                        />
                        <PostDetailsText>
                            <PostTitle>{postDetails.title}</PostTitle>
                            <PostDescription>{post.excerpt}</PostDescription>
                            <PostTags
                                tags={postDetails.tags}
                                justifyContent="flex-start"
                            />
                        </PostDetailsText>
                    </PostDetails>
                    <ButtonWrapper>
                        <Link to={postDetails.path}>
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
                        </Link>
                    </ButtonWrapper>
                </Card>
            );
        })}
    </PostsPreviewWrapper>
);

PostsPreview.propTypes = {
    posts: PropTypes.array.isRequired,
};

export default withTheme(PostsPreview);
