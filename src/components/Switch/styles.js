import styled, { css } from 'styled-components';

export const SwitchWrapper = styled.li`
    display: flex;
    margin-left: ${({ theme }) => theme.sizes.big};
    flex-direction: row;
    align-items: center;
`;

export const SwitchToggleTheme = styled.label`
    position: relative;
    display: inline-block;
    width: 45px;
    height: 22px;

    input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    input:checked + span::before {
        transform: translateX(23px);
    }
`;

export const SwitchSlider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    border: 2px solid
        ${({ theme, colorTheme }) =>
            colorTheme === 'light' ? theme.colors.main : theme.colors.white};
    transition: ${({ theme }) => theme.transition};
    border-radius: 20px;

    ::before {
        position: absolute;
        content: '';
        height: 16px;
        width: 16px;
        left: 1px;
        bottom: 1px;
        background-color: ${({ theme, colorTheme }) =>
            colorTheme === 'light' ? theme.colors.main : theme.colors.white};
        transition: ${({ theme }) => theme.transition};
        border-radius: 50%;
    }
`;

export const SwitchLabel = styled.span`
    font-weight: ${({ theme }) => theme.fonts.bold};
    font-size: 18px;
    margin: ${({ theme }) => `0 ${theme.sizes.small}`};
    color: ${({ theme, colorTheme }) =>
        colorTheme === 'light'
            ? theme.colors.darkGrey
            : theme.colors.lightGrey};
    ${({ active }) =>
        !active &&
        css`
            opacity: 0.35;
        `}
`;
