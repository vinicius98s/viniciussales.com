import styled from 'styled-components';

export const MainInfoWrapper = styled.div`
  position: relative;
  min-height: 250px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.sizes.default};

  & > div {
    width: 100%;
  }
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

  .gatsby-highlight {
    background-color: ${({ theme }) => theme.colors.semiDarkGrey};
    border-radius: 0.3em;
    margin: 0.5em 0;
    overflow: auto;

    pre[class*='language-'] {
      background-color: transparent;
      overflow: initial;
      float: left;
      min-width: calc(100% - 1em);
      margin-left: 1em;
      padding-right: 1.5em;

      .gatsby-highlight-code-line {
        background-color: ${({ theme }) => theme.colors.darkGrey};
        display: block;
        margin-right: -1.5em;
        margin-left: -2em;
        padding-right: 2em;
        padding-left: 1.75em;
        border-left: 0.25em solid ${({ theme }) => theme.colors.main};
      }

      .line-numbers-rows {
        margin-top: 1em;
      }

      .line-numbers {
        margin-top: 1em;
        padding: 0;
        padding-left: 2.8em;
        overflow: initial;
      }
    }

    * {
      font-family: Consolas, Menlo, Monaco, source-code-pro, Courier New,
        monospace;
      font-size: 16px;
    }
  }
`;
