import styled from 'styled-components';

export const PostsPreviewWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: ${({ theme }) => theme.sizes.medium};
`;

export const PostPreview = styled.div`
    flex-basis: 48%;
    display: flex;
    height: auto;
    flex-direction: column;
    background: ${({ theme }) => theme.colors.semiDarkGrey};
    border-top: 5px solid ${({ theme }) => theme.colors.pink};
    border-radius: 15px;
    margin-right: ${({ theme, margin }) => margin && theme.sizes.default};
    margin-bottom: ${({ theme }) => theme.sizes.medium};
    padding: ${({ theme }) => theme.sizes.default};
`;

export const PostTitle = styled.h1`
    font-size: 20px;
    font-weight: 500;
    width: 100%;
    color: ${({ theme }) => theme.colors.white};
    margin-bottom: ${({ theme }) => theme.sizes.small};
`;

export const PostDescription = styled.p`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.white};
    text-overflow: ellipsis;
    height: 40px;
    margin-bottom: ${({ theme }) => theme.sizes.default};
`;
