import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import { ThemeContext } from '../LayoutContext';

import {
    PostsPreviewWrapper,
    PostPreview,
    PostTitle,
    PostDescription,
} from './styles';

const PostsPreview = ({ posts }) => {
    const { colorTheme } = useContext(ThemeContext);

    return (
        <PostsPreviewWrapper>
            {posts
                .filter(post => post.node.frontmatter.title.length > 0)
                .map(({ node: post }, index) => (
                    <PostPreview
                        key={post.id}
                        margin={index % 2 === 0}
                        colorTheme={colorTheme}
                    >
                        <PostTitle>{post.frontmatter.title}</PostTitle>
                        <PostDescription>{post.excerpt}</PostDescription>
                        <Button width="130px" margin="25px 0 0">
                            Read
                        </Button>
                    </PostPreview>
                ))}
        </PostsPreviewWrapper>
    );
};

PostsPreview.propTypes = {
    posts: PropTypes.array.isRequired,
};

export default PostsPreview;
