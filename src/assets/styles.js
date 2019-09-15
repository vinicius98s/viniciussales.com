import styled from 'styled-components';

export const StyledH1 = styled.h1`
  font-size: 26px;
  font-weight: ${({ theme }) => theme.fonts.bold};
`;

export const StyledH2 = styled.h2`
  font-size: 18px;
  font-weight: ${({ theme }) => theme.fonts.medium};
  margin: ${({ theme, noMargin }) =>
    !noMargin && `${theme.sizes.mini} 0 ${theme.sizes.default}`};
`;

export const StyledText = styled.p`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.fonts.regular};
  margin-top: ${({ theme }) => theme.sizes.small};
`;

export const ProjectInfoWrapper = styled.div`
  margin-left: ${({ theme, marginLeft }) => marginLeft && theme.sizes.default};
  margin-top: ${({ theme, marginTop }) => marginTop && theme.sizes.default};

  p {
    font-size: 16px;
  }
`;

export const ImageWrapper = styled.div`
  min-width: ${({ minWidth }) => minWidth && '400px'};
  width: 100%;
`;

export const TechInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.sizes.default};
  margin-top: ${({ theme }) => theme.sizes.small};

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;

    div {
      align-self: center;
      margin-top: ${({ theme }) => theme.sizes.small};
    }
  }
`;

export const Techs = styled.div`
  font-size: 25px;
  display: flex;
  align-items: center;

  * {
    margin: 0 ${({ theme }) => theme.sizes.small};
  }

  div:first-child svg {
    :hover {
      color: #00d8ff;
    }
  }

  div:nth-child(2) svg {
    :hover {
      color: #a6d16a;
    }
  }

  div:nth-child(3) svg {
    :hover {
      color: #41b883;
    }
  }
`;
