import styled, { css } from 'styled-components';
import hexToRgba from '../../utils/hexToRgba';

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
    ${({ theme, colorTheme }) =>
        colorTheme === 'light' &&
        css`
            box-shadow: 0 5px 20px ${hexToRgba(theme.colors.darkGrey, 0.15)};
        `};
    background: ${({ theme, colorTheme }) =>
        colorTheme === 'light'
            ? theme.colors.lightGrey
            : theme.colors.semiDarkGrey};
    color: ${({ theme, colorTheme }) =>
        colorTheme === 'light' ? theme.colors.darkGrey : theme.colors.white};
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
    margin-bottom: ${({ theme }) => theme.sizes.small};
`;

export const PostDescription = styled.p`
    font-size: 14px;
    text-overflow: ellipsis;
    height: 40px;
    margin-bottom: ${({ theme }) => theme.sizes.default};
`;
