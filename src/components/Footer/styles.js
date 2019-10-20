import styled, { css } from 'styled-components';

import { CONTAINER_MAX_WIDTH, WIDTH_BREAKPOINT } from 'src/utils/constants';

export const FooterContainer = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.sizes.medium};
  position: relative;

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
`;

export const FooterWrapper = styled.div`
  width: 100%;
  max-width: ${CONTAINER_MAX_WIDTH}px;
  padding: ${({ theme }) => `${theme.sizes.medium} ${theme.sizes.default}`};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const MailSubscription = styled.div`
  h1 {
    font-size: 28px;
    margin-bottom: ${({ theme }) => theme.sizes.default};
    margin-left: 2px;
  }
`;

export const Contact = styled.div`
  min-width: 250px;
  display: flex;
  justify-content: flex-end;

  & > a {
    text-decoration: underline dotted;
    text-align: right;
    line-height: ${({ theme }) => theme.sizes.default};
    position: absolute;
    bottom: ${({ theme }) => theme.sizes.medium};
  }
`;
