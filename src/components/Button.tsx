import { theme } from '@apify-packages/ui-library';
import React, { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';

// TODO: implement secondary, success and danger
export const BUTTON_VARIANTS = {
    DEFAULT: 'DEFAULT',
    PRIMARY: 'PRIMARY',
};

export const BUTTON_SIZES = {
    SMALL: 'SMALL',
    MEDIUM: 'MEDIUM',
};

type ButtonSize = typeof BUTTON_SIZES[keyof typeof BUTTON_SIZES];
type ButtonVariant = typeof BUTTON_VARIANTS[keyof typeof BUTTON_VARIANTS];

interface ButtonProps extends PropsWithChildren {
    variant?: ButtonVariant,
    size?: ButtonSize;
}

const BUTTON_SIZES_CSS = {
    [BUTTON_SIZES.SMALL]: css`
        padding: 1.2rem;

        font-size: 1.4rem;
        font-style: normal;
        font-weight: 600;
        line-height: 2.4rem;
    `,
    [BUTTON_SIZES.MEDIUM]: css`
        padding: 1.2rem 2.4rem;

        font-size: 1.6rem;
        font-style: normal;
        font-weight: 600;
        line-height: 2.4rem;

        @media (min-width: ${theme.layout.desktop}) {
            font-size: 1.8rem;
            line-height: 2.8rem;
        }
    `,
};

const BUTTON_VARIANTS_CSS = {
    [BUTTON_VARIANTS.DEFAULT]: css`
        background-color: ${theme.color.neutral.background};
        color: ${theme.color.neutral.text};
        border: 1px solid ${theme.color.neutral.border};
        &:hover, &:focus {
            background-color: ${theme.color.neutral.backgroundHover};
        }
        &:active {
            background-color: ${theme.color.neutral.backgroundActive};
        }
    `,
    [BUTTON_VARIANTS.PRIMARY]: css`
        background-color: ${theme.color.primary.action};
        color: ${theme.color.neutral.textOnPrimary};
        &:hover, &:focus {
            background-color: ${theme.color.primary.actionHover};
        }
        &:active {
            background-color: ${theme.color.primary.actionActive};
        }
    `,
};

const getButtonSizeCss = ({ size = BUTTON_SIZES.MEDIUM }: ButtonProps) => BUTTON_SIZES_CSS[size];
const getButtonVariantCss = ({ variant = BUTTON_VARIANTS.PRIMARY }: ButtonProps) => BUTTON_VARIANTS_CSS[variant];

const StyledButton = styled.button<ButtonProps>`
    cursor: pointer;
    border: none;
    border-radius: ${theme.radius.radius8};
    transition: ${theme.transition.smoothEaseOut};
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: var(--ifm-font-family-base);

    ${getButtonVariantCss}
    ${getButtonSizeCss}
`;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
    return <StyledButton {...rest}>
        {children}
    </StyledButton>;
};

export default Button;
