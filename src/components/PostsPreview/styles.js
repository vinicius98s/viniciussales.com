import styled from 'styled-components';

import { POSTS_PREVIEW_BREAKPOINT } from './constants';

export const PostsPreviewWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: ${({ theme }) => theme.sizes.medium};

  @media (max-width: ${POSTS_PREVIEW_BREAKPOINT}px) {
    flex-wrap: wrap;
  }
`;

export const PostTitle = styled.h1`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.fonts.bold};
  width: 100%;
  margin-bottom: ${({ theme }) => theme.sizes.small};
`;

export const PostDescription = styled.p`
  font-size: 14px;
  text-overflow: ellipsis;
  margin-bottom: ${({ theme }) => theme.sizes.small};
`;

export const PostDetails = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: ${({ theme }) => theme.sizes.medium};

  & div:first-child {
    position: absolute !important;
    left: 0;
    margin-top: 4px;
  }

  @media (max-width: 768px) {
    & div:first-child {
      position: relative !important;
    }

    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }
`;

export const PostDetailsText = styled.div`
  width: 100%;
  /* Featured image size = 200px */
  margin-left: 200px;

  @media (max-width: 768px) {
    margin-left: 0;

    h1 {
      margin-top: ${({ theme }) => theme.sizes.default};
    }
  }
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  cursor: pointer;
`;
