import React from 'react';
import { graphql } from 'gatsby';
import LayoutContext from '../components/LayoutContext';
import SEO from '../components/SEO';

export default ({ data }) => {
    // const { edges: posts } = data.allMarkdownRemark;

    return (
        <LayoutContext>
            <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
            {/*  <StyledPostPreviewWrapper>
                <div className="title">
                    <h1>LAST POSTS</h1>
                </div>
                {posts
                    .filter(post => post.node.frontmatter.title.length > 0)
                    .map(({ node: post }) => (
                        <PostPreview post={post} key={post.id} />
                    ))}
            </StyledPostPreviewWrapper> */}
        </LayoutContext>
    );
};

export const pageQuery = graphql`
    query IndexQuery {
        allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___date] }) {
            edges {
                node {
                    excerpt(pruneLength: 200)
                    id
                    frontmatter {
                        title
                        date(formatString: "MMMM DD, YYYY")
                        path
                    }
                }
            }
        }
    }
`;
