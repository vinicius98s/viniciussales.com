import styled, { css } from 'styled-components';

import { CONTAINER_MAX_WIDTH, WIDTH_BREAKPOINT } from 'src/utils/constants';

export const FooterWrapper = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.sizes.medium};
  ${({ theme, colorTheme }) =>
    colorTheme === 'light'
      ? css`
          background: ${theme.colors.white};
          a {
            color: ${theme.colors.darkGrey};
          }
        `
      : css`
          background: ${theme.colors.semiDarkGrey};
          a {
            color: ${theme.colors.white};
          }
        `};

  a {
    text-decoration: underline dotted;
    text-align: right;
    line-height: ${({ theme }) => theme.sizes.default};
  }
`;

export const MailSubscription = styled.div`
  width: 100%;
  max-width: ${CONTAINER_MAX_WIDTH}px;
  padding: ${({ theme }) => `${theme.sizes.medium} ${theme.sizes.default}`};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: ${WIDTH_BREAKPOINT}px) {
    flex-direction: column;

    a {
      margin-top: ${({ theme }) => theme.sizes.medium};
      text-align: center;
    }
  }

  h1 {
    font-size: 28px;
    margin-bottom: ${({ theme }) => theme.sizes.default};
  }
`;
