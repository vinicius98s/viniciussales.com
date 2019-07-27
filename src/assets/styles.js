import styled from 'styled-components';

export const StyledH1 = styled.h1`
  font-size: 26px;
  font-weight: ${({ theme }) => theme.fonts.bold};
`;

export const StyledH2 = styled.h2`
  font-size: 18px;
  font-weight: ${({ theme }) => theme.fonts.medium};
  margin: ${({ theme }) => `${theme.sizes.mini} 0 ${theme.sizes.default}`};
`;

export const StyledText = styled.p`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.fonts.regular};
  margin-top: ${({ theme }) => theme.sizes.small};
`;

export const ProjectInfoWrapper = styled.div`
  margin-left: ${({ theme }) => theme.sizes.default};
  p {
    font-size: 16px;
  }
`;

export const ProjectWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ImageWrapper = styled.div`
  min-width: 400px;
`;
