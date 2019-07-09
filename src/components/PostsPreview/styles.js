import styled from 'styled-components';

export const PostsPreviewWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: ${({ theme }) => theme.sizes.medium};
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
    margin-bottom: ${({ theme }) => theme.sizes.default};
`;

export const PostDetails = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: ${({ theme }) => theme.sizes.medium};
`;

export const PostDetailsText = styled.div`
    width: calc(100% - 135px);
    margin-left: ${({ theme }) => theme.sizes.default};
`;

export const ButtonWrapper = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    cursor: pointer;
`;
