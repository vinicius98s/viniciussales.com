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
    StyledP,
    DescriptionWrapper,
} from './styles';

export default ({ data }) => {
    const { edges: posts } = data.allMarkdownRemark;

    return (
        <>
            <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
            <LayoutContext>
                <PageTitleWrapper>
                    <StyledH1 margin="0 8px 0 0">Vinicius Sales</StyledH1>
                    <StyledH2 margin="0 0 1px 0">
                        {' '}
                        - FrontEnd developer
                    </StyledH2>
                    <DescriptionWrapper>
                        <StyledP>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Consequuntur odio, quia quae cupiditate eius
                            est vitae dolorum, iste impedit cumque facilis quas
                            sapiente! Placeat mollitia reprehenderit ratione?
                            Excepturi, placeat ducimus?
                        </StyledP>
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
                        date(formatString: "MMMM DD, YYYY")
                        path
                    }
                }
            }
        }
    }
`;
