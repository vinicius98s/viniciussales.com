import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

import PostPreview from "../components/PostPreview";
import { StyledPostPreviewWrapper } from "../components/PostPreview/styled";

export default ({ data }) => {
    const { edges: posts } = data.allMarkdownRemark;

    return (
        <Layout active="home" headerTitle="Vinícius Sales" headerDescription="Front-end Developer">
            <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
            <StyledPostPreviewWrapper>
                <div className="title">
                    <h1>LAST POSTS</h1>
                </div>
                {posts
                    .filter(post => post.node.frontmatter.title.length > 0)
                    .map(({ node: post }) => (
                        <PostPreview post={post} key={post.id} />
                    ))}
            </StyledPostPreviewWrapper>
        </Layout>
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
                        featuredImage {
                            childImageSharp {
                                fluid(maxWidth: 1250, maxHeight: 250) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                        previewImage {
                            childImageSharp {
                                fluid(maxWidth: 400) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
