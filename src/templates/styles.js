import styled from 'styled-components';

export const MainInfoWrapper = styled.div`
    position: relative;
    min-height: 250px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${({ theme }) => theme.sizes.default};
`;

export const PostInfoWrapper = styled.div`
    text-align: center;
    z-index: 1;
    padding: ${({ theme }) => theme.sizes.default};
`;

export const PostTitle = styled.h1`
    text-transform: uppercase;
    font-weight: ${({ theme }) => theme.fonts.bold};
`;

export const PostDescription = styled.h3`
    font-weight: ${({ theme }) => theme.fonts.medium};
    margin: ${({ theme }) => `${theme.sizes.mini} 0 ${theme.sizes.small}`};
`;

export const Post = styled.div`
    line-height: 1.58;

    h3 {
        font-size: 22px;
    }

    p {
        font-size: 20px;
    }

    * {
        margin: ${({ theme }) => `${theme.sizes.default} 0`};
    }

    .gatsby-highlight {
        border-left: 2px solid ${({ theme }) => theme.colors.main};

        * {
            font-family: 'Courier New', Courier, monospace !important;
            font-size: 18px;
        }
    }
`;
