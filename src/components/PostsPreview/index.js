import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import Card from '../Card';

import { PostsPreviewWrapper, PostTitle, PostDescription } from './styles';

const PostsPreview = ({ posts }) => {
    return (
        <PostsPreviewWrapper>
            {posts
                .filter(post => post.node.frontmatter.title.length > 0)
                .map(({ node: post }, index) => (
                    <Card
                        key={post.id}
                        margin={{
                            right: index % 2 === 0 && 'default',
                            bottom: 'medium',
                        }}
                        flexBasis={48}
                    >
                        <PostTitle>{post.frontmatter.title}</PostTitle>
                        <PostDescription>{post.excerpt}</PostDescription>
                        <Button width="130px" margin="25px 0 0">
                            Read
                        </Button>
                    </Card>
                ))}
        </PostsPreviewWrapper>
    );
};

PostsPreview.propTypes = {
    posts: PropTypes.array.isRequired,
};

export default PostsPreview;
