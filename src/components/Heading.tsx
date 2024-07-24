import { TextBaseComponent, TextBaseProps, theme } from '@apify-packages/ui-library';
import React from 'react';
import styled, { css } from 'styled-components';

/**
 * @typedef {Object} HeadingProps
 * @property {React.ReactNode} [children]
 * @property {string} [className]
 * @property {'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'} [as]
 * @property {'titleXs' | 'titleS' | 'titleM' | 'titleL' | 'titleXl' | 'title2Xl' | 'displayXL' | 'title2Xl' | 'title3Xl'} [type]
 * @property {string} [color]
 * @property {'left' | 'center' | 'right'} [align]
 * @property {Boolean} [italic]
 */

const HEADING_VARIANTS_CSS = {
    titleXs: css`
        ${theme.typography.shared.mobile.titleXs}
        @media (min-width: ${theme.layout.tablet}) {
            ${theme.typography.shared.tablet.titleXs}
        }
        @media (min-width: ${theme.layout.desktop}) {
            ${theme.typography.shared.desktop.titleXs}
        }
    `,
    titleS: css`
        ${theme.typography.shared.mobile.titleS}
        @media (min-width: ${theme.layout.tablet}) {
            ${theme.typography.shared.tablet.titleS}
        }
        @media (min-width: ${theme.layout.desktop}) {
            ${theme.typography.shared.desktop.titleS}
        }
    `,
    titleM: css`
        ${theme.typography.shared.mobile.titleM}
        @media (min-width: ${theme.layout.tablet}) {
            ${theme.typography.shared.tablet.titleM}
        }
        @media (min-width: ${theme.layout.desktop}) {
            ${theme.typography.shared.desktop.titleM}
        }
    `,
    titleL: css`
        ${theme.typography.shared.mobile.titleL}
        @media (min-width: ${theme.layout.tablet}) {
            ${theme.typography.shared.tablet.titleL}
        }
        @media (min-width: ${theme.layout.desktop}) {
            ${theme.typography.shared.desktop.titleL}
        }
    `,
    titleXl: css`
        ${theme.typography.shared.mobile.titleXl}
        @media (min-width: ${theme.layout.tablet}) {
            ${theme.typography.shared.tablet.titleXl}
        }
        @media (min-width: ${theme.layout.desktop}) {
            ${theme.typography.shared.desktop.titleXl}
        }
    `,
    title2Xl: css`
        ${theme.typography.shared.mobile.title2xl}
        @media (min-width: ${theme.layout.tablet}) {
            ${theme.typography.shared.tablet.title2xl}
        }
        @media (min-width: ${theme.layout.desktop}) {
            ${theme.typography.shared.desktop.title2xl}
        }
    `,
    title3Xl: css`
        ${theme.typography.shared.mobile.title3xl}
        @media (min-width: ${theme.layout.tablet}) {
            ${theme.typography.shared.tablet.title3xl}
        }
        @media (min-width: ${theme.layout.desktop}) {
            ${theme.typography.shared.desktop.title3xl}
        }
    `,
};

export const HEADING_ELEMENTS = {
    H1: 'h1',
    H2: 'h2',
    H3: 'h3',
    H4: 'h4',
    H5: 'h5',
    H6: 'h6',
};

export const HEADING_TYPES = {
    TITLE_XS: 'titleXs',
    TITLE_S: 'titleS',
    TITLE_M: 'titleM',
    TITLE_L: 'titleL',
    TITLE_XL: 'titleXl',
    TITLE_2XL: 'title2Xl',
    TITLE_3XL: 'title3Xl',
};

type HeadingType = (typeof HEADING_TYPES)[keyof typeof HEADING_TYPES];

const HEADING_DEFAULT_ELEMENTS = {
    title2Xl: HEADING_ELEMENTS.H1,
    titleXl: HEADING_ELEMENTS.H2,
    titleL: HEADING_ELEMENTS.H3,
    titleM: HEADING_ELEMENTS.H4,
    titleS: HEADING_ELEMENTS.H5,
    titleXs: HEADING_ELEMENTS.H6,
};

interface HeadingCssProps {
    $type?: string;
}

const getHeadingCss = ({ $type = 'titleXs' }: HeadingCssProps) => HEADING_VARIANTS_CSS[$type];

const StyledHeading = styled(TextBaseComponent)<HeadingCssProps>`
    margin: 0;
    ${getHeadingCss}
`;

/**
 *
 * @param {HeadingProps} props
 */
export const Heading: React.FC<TextBaseProps & { type: HeadingType }> = ({
    type,
    as,
    ...rest
}) => (
    <StyledHeading
        forwardedAs={as || (type && HEADING_DEFAULT_ELEMENTS[type]) || 'h1'}
        $type={type}
        {...rest}
    />
);
