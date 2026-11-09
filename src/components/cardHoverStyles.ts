import { css } from 'styled-components';

export const cardHoverStyles = css`
    background-color: var(--color-neutral-card-background);
    border-color: var(--color-neutral-border);

    &:hover {
        background-color: var(--color-neutral-card-background-hover);
        border-color: var(--color-neutral-border);
    }
`;
