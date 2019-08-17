import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.sizes.medium};
`;

export const Logo = styled.img`
  width: 70px;
  height: 65px;
`;
