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

  > * {
    margin: ${({ theme }) => `${theme.sizes.default} 0`};
  }

  h3 {
    font-size: 22px;
  }

  p {
    font-size: 17px;
  }

  blockquote {
    font-style: italic;
    padding: ${({ theme }) => `${theme.sizes.small} ${theme.sizes.default}`};
    border-left: 5px solid ${({ theme }) => theme.colors.main};
    p {
      font-size: 18px;
    }
  }

  .language-text {
    padding: ${({ theme }) => `0 ${theme.sizes.mini}`};
  }

  a {
    color: ${({ theme }) => theme.colors.main};
  }

  pre {
    padding: ${({ theme }) => theme.sizes.default};
  }

  .gatsby-highlight {
    border-left: 0.25em solid ${({ theme }) => theme.colors.main};

    .gatsby-highlight-code-line {
      background-color: ${({ theme }) => theme.colors.darkGrey};
      display: block;
      margin-right: -1.58em;
      margin-left: -1.55em;
      padding-right: 1em;
      padding-left: 1.4em;
      border-left: 0.25em solid ${({ theme }) => theme.colors.lightGrey};
    }

    * {
      font-family: Consolas, Menlo, Monaco, source-code-pro, Courier New,
        monospace !important;
      font-size: 16px;
    }
  }
`;
