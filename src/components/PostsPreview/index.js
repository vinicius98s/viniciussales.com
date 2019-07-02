import React from 'react';
import PropTypes from 'prop-types';
import {
    PostsPreviewWrapper,
    PostPreview,
    PostTitle,
    PostDescription,
} from './styles';

const PostsPreview = ({ posts }) => {
    return (
        <PostsPreviewWrapper>
            {posts
                .filter(post => post.node.frontmatter.title.length > 0)
                .map(({ node: post }, index) => (
                    <PostPreview key={post.id} margin={index % 2 === 0}>
                        <PostTitle>{post.frontmatter.title}</PostTitle>
                        <PostDescription>{post.excerpt}</PostDescription>
                        Read
                    </PostPreview>
                ))}
        </PostsPreviewWrapper>
    );
};

PostsPreview.propTypes = {
    posts: PropTypes.array.isRequired,
};

export default PostsPreview;
