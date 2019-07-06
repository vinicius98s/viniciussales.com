import React from 'react';
import { Helmet } from 'react-helmet';
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

export default ({ data }) => {
    const { markdownRemark: post } = data;
    const { frontmatter: postDetails } = post;
    console.log(postDetails);

    return (
        <LayoutContext>
            <Helmet title={`Vinicius Sales - ${postDetails.title}`} />
            <MainInfoWrapper>
                <Img
                    style={{
                        position: 'absolute',
                        width: '100%',
                        opacity: 0.1,
                    }}
                    fluid={postDetails.featuredImage.childImageSharp.fluid}
                />
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
            excerpt(pruneLength: 200)
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
