import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

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

const PostsPreview = ({ posts }) => {
    return (
        <PostsPreviewWrapper>
            {posts.map(({ node: post }, index) => {
                const { frontmatter: postDetails } = post;
                console.log(postDetails);

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
                                    postDetails.previewImage.childImageSharp
                                        .fixed
                                }
                            />
                            <PostDetailsText>
                                <PostTitle>{postDetails.title}</PostTitle>
                                <PostDescription>
                                    {post.excerpt}
                                </PostDescription>
                                <PostTags tags={postDetails.tags} />
                            </PostDetailsText>
                        </PostDetails>
                        <ButtonWrapper>
                            <Link to={postDetails.path}>
                                <Button
                                    width="100%"
                                    padding="10px 0"
                                    borderRadius={{
                                        topLeft: '0',
                                        topRight: '0',
                                        bottomLeft: '10px',
                                        bottomRight: '10px',
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
};

PostsPreview.propTypes = {
    posts: PropTypes.array.isRequired,
};

export default PostsPreview;
