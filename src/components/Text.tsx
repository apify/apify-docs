import styled, { css } from 'styled-components';

import type { TextBaseProps } from '@apify-packages/ui-library';
import {
    TextBaseComponent,
    theme,
} from '@apify-packages/ui-library';

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
            bold: css`${theme.typography.shared.mobile.bodyLStrong}`,
        },
        regular: {
            normal: css`${theme.typography.shared.mobile.bodyM}`,
            bold: css`${theme.typography.shared.mobile.bodyMStrong}`,
        },
        small: {
            normal: css`${theme.typography.shared.mobile.bodyS}`,
            bold: css`${theme.typography.shared.mobile.bodySStrong}`,
        },
    },
    code: {
        large: {
            normal: css`${theme.typography.shared.mobile.codeL}`,
            bold: css`${theme.typography.shared.mobile.codeLStrong}`,
        },
        regular: {
            normal: css`${theme.typography.shared.mobile.codeM}`,
            bold: css`${theme.typography.shared.mobile.codeMStrong}`,
        },
        small: {
            normal: css`${theme.typography.shared.mobile.codeS}`,
            bold: css`${theme.typography.shared.mobile.codeSStrong}`,
        },
    },
};

interface TextComponentProps extends TextBaseProps {
    type?: string;
    size?: string;
    weight?: string;
    as?: React.ElementType;
}

interface TextCssProps {
    $type?: string;
    $size?: string;
    $weight?: string;
}

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
