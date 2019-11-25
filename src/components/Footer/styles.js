import styled, { css } from 'styled-components';

import { CONTAINER_MAX_WIDTH } from 'src/utils/constants';
import { FOOTER_BREAKPOINT } from './constants';

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

  @media (max-width: ${FOOTER_BREAKPOINT}px) {
    flex-direction: column;
    align-items: flex-start;
  }
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

  @media (max-width: ${FOOTER_BREAKPOINT}px) {
    flex-direction: column;
    margin-top: ${({ theme }) => theme.sizes.default};
  }

  & > a {
    text-decoration: underline dotted;
    text-align: right;
    line-height: ${({ theme }) => theme.sizes.default};
    position: absolute;
    bottom: ${({ theme }) => theme.sizes.medium};

    @media (max-width: ${FOOTER_BREAKPOINT}px) {
      position: relative;
      bottom: 0;
      margin-top: ${({ theme }) => theme.sizes.default};
    }
  }
`;
