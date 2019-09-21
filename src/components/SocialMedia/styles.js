import styled from 'styled-components';
import ReactGA from 'react-ga';

export const SocialMediaWrapper = styled.div`
  margin-top: ${({ theme }) => theme.sizes.medium};

  p {
    margin-bottom: ${({ theme }) => theme.sizes.small};
  }
`;

export const Link = styled(ReactGA.OutboundLink)`
  transition: ${({ theme }) => theme.transition};
  text-decoration: none;
  color: ${({ theme, colorTheme }) =>
    colorTheme === 'light' ? theme.colors.darkGrey : theme.colors.white};
  font-size: ${({ theme }) => theme.sizes.default};
  margin-right: ${({ theme }) => theme.sizes.default};
  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.colors.main};
  }
`;
