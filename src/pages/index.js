import React from 'react';
import { graphql } from 'gatsby';

import LayoutContext from 'src/components/LayoutContext';
import SEO from 'src/components/SEO';
import SocialMedia from 'src/components/SocialMedia';
import PostsPreview from 'src/components/PostsPreview';

import {
    PageTitleWrapper,
    StyledH1,
    StyledH2,
    StyledText,
    DescriptionWrapper,
} from './styles';

export default ({ data }) => {
    const { edges: posts } = data.allMarkdownRemark;

    return (
        <>
            <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
            <LayoutContext>
                <StyledH1>Vinicius Sales</StyledH1>
                <StyledH2>
                    Front-end developer - React, React Native and Node.js
                </StyledH2>
                <PageTitleWrapper>
                    <DescriptionWrapper>
                        <StyledText>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Consequuntur odio, quia quae cupiditate eius
                            est vitae dolorum, iste impedit cumque facilis quas
                            sapiente! Placeat mollitia reprehenderit ratione?
                            Excepturi, placeat ducimus?
                        </StyledText>
                    </DescriptionWrapper>
                    <SocialMedia />
                </PageTitleWrapper>
                <PostsPreview posts={posts} />
            </LayoutContext>
        </>
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
                        # date(formatString: "MMMM DD, YYYY")
                        path
                        tags
                        previewImage {
                            childImageSharp {
                                fixed(width: 135, height: 135, quality: 100) {
                                    ...GatsbyImageSharpFixed
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
