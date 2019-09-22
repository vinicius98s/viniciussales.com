import styled, { css } from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: ${({ theme, colorTheme }) =>
    colorTheme === 'light' ? theme.colors.lightGrey : theme.colors.darkGrey};
  font-weight: ${({ theme }) => theme.fonts.medium};
  padding: ${({ theme }) =>
    `${theme.sizes.medium} ${theme.sizes.default} 45px`};
  border-radius: ${({ theme }) => theme.sizes.small};
  width: 360px;

  @media (max-width: 420px) {
    width: 100%;
  }

  label {
    font-size: 16px;

    span {
      color: ${({ theme }) => theme.colors.main};
      font-size: 15px;
    }

    p {
      margin-top: ${({ theme }) => theme.sizes.small};
    }

    div {
      display: flex;
      justify-content: space-between;
    }
  }

  label:first-child {
    margin-bottom: ${({ theme }) => theme.sizes.default};
  }

  input {
    width: 100%;
    margin-top: ${({ theme }) => theme.sizes.mini};
    border-radius: ${({ theme }) => theme.sizes.mini};
    padding: ${({ theme }) => `${theme.sizes.small} ${theme.sizes.mini}`};
    border: none;
    font-size: 14px;
    outline: none;
    ${({ colorTheme, theme }) =>
      colorTheme === 'light'
        ? css`
            border: 2px solid #eee;
          `
        : css`
            background: #404040;
            color: ${theme.colors.white};

            ::placeholder {
              color: ${theme.colors.white};
            }
          `};

    ::placeholder {
      opacity: 0.6;
    }
  }
`;
