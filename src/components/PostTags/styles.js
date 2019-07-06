import styled from 'styled-components';

export const TagsWrapper = styled.div`
    display: flex;
    justify-content: ${({ justifyContent }) => justifyContent || 'center'};
    align-items: ${({ alignItems }) => alignItems};

    button {
        margin-right: ${({ theme }) => theme.sizes.small};
    }
`;
