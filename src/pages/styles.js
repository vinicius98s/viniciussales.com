import styled from 'styled-components';

export const PageTitleWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;

export const StyledH1 = styled.h1`
    font-size: 26px;
    font-weight: bold;
    margin: ${({ margin }) => margin};
`;

export const StyledH2 = styled.h2`
    font-size: 20px;
    font-weight: 500;
`;

export const DescriptionWrapper = styled.div`
    width: 100%;
    margin-top: ${({ theme }) => theme.sizes.small};
`;

export const StyledP = styled.p`
    font-size: 20px;
    font-weight: 200;
`;
