import styled from 'styled-components';

export const PostsPreviewWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: ${({ theme }) => theme.sizes.medium};
`;

export const PostTitle = styled.h1`
    font-size: 20px;
    font-weight: 500;
    width: 100%;
    margin-bottom: ${({ theme }) => theme.sizes.small};
`;

export const PostDescription = styled.p`
    font-size: 14px;
    text-overflow: ellipsis;
    height: 40px;
    margin-bottom: ${({ theme }) => theme.sizes.default};
`;
