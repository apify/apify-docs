import styled, { css } from 'styled-components';

import type { TextBaseProps } from '@apify/ui-library';
import {
    TextBaseComponent,
    theme,
} from '@apify/ui-library';

/**
 * @typedef {Object} TextProps
 * @property {React.ReactNode} [children]
 * @property {string} [className]
 * @property {'p' | 'span'} [as]
 * @property {'body' | 'code'} [type]
 * @property {'large' | 'regular' | 'small'} [size]
 * @property {'normal' | 'bold'} [weight]
 * @property {Boolean} [italic]
 * @property {Boolean} [uppercase]
 * @property {string} [color]
 * @property {'left' | 'center' | 'right'} [align]
 */

/**
 * Mapping of text type, size, and weight to exact styles that should be used.
 */
const TEXT_VARIANTS_CSS = {
    body: {
        large: {
            normal: css`${theme.typography.shared.mobile.bodyL}`,
            medium: css`${theme.typography.shared.mobile.bodyLMedium}`,
            bold: css`${theme.typography.shared.mobile.bodyLStrong}`,
        },
        regular: {
            normal: css`${theme.typography.shared.mobile.bodyM}`,
            medium: css`${theme.typography.shared.mobile.bodyMMedium}`,
            bold: css`${theme.typography.shared.mobile.bodyMStrong}`,
        },
        small: {
            normal: css`${theme.typography.shared.mobile.bodyS}`,
            medium: css`${theme.typography.shared.mobile.bodySMedium}`,
            bold: css`${theme.typography.shared.mobile.bodySStrong}`,
        },
    },
    code: {
        large: {
            normal: css`${theme.typography.shared.mobile.codeL}`,
            medium: css`${theme.typography.shared.mobile.codeLMedium}`,
            bold: css`${theme.typography.shared.mobile.codeLStrong}`,
        },
        regular: {
            normal: css`${theme.typography.shared.mobile.codeM}`,
            medium: css`${theme.typography.shared.mobile.codeMMedium}`,
            bold: css`${theme.typography.shared.mobile.codeMStrong}`,
        },
        small: {
            normal: css`${theme.typography.shared.mobile.codeS}`,
            medium: css`${theme.typography.shared.mobile.codeSMedium}`,
            bold: css`${theme.typography.shared.mobile.codeSStrong}`,
        },
    },
};

type TextComponentProps = TextBaseProps & {
    type?: 'body' | 'code';
    size?: 'large' | 'regular' | 'small';
    weight?: 'normal' | 'medium' | 'bold';
    as?: React.ElementType;
};

type TextCssProps = {
    $type?: 'body' | 'code';
    $size?: 'large' | 'regular' | 'small';
    $weight?: 'normal' | 'medium' | 'bold';
};

const getTextCss = ({ $type = 'body', $size = 'regular', $weight = 'normal' }: TextCssProps) => {
    return TEXT_VARIANTS_CSS[$type]?.[$size]?.[$weight];
};

const StyledText = styled(TextBaseComponent)<TextCssProps>`${getTextCss}`;

/**
 * @param {TextProps} props
 */
export const Text: React.FC<TextComponentProps> = ({
    type,
    size,
    weight,
    as,
    ...rest
}) => (
    <StyledText
        $type={type}
        $size={size}
        $weight={weight}
        forwardedAs={as}
        {...rest}
    />
);
