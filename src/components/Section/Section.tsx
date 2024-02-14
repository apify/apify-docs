import { theme } from '@apify-packages/ui-components';
import React from 'react';

import styles from './styles.module.css';
import { Heading } from '../Heading';
import { Text } from '../Text';

interface SectionProps {
    heading?: string;
    description?: string;
    children: React.ReactNode | string;
}

export default function Section({ heading, description, children }: SectionProps) {
    return (
        <section className={styles.section}>
            {(heading || description) && <div className={styles.sectionHeader}>
                {heading && <Heading type='titleXl'>{heading}</Heading>}
                {description && <Text color={theme.color.neutral.textMuted}>{description}</Text>}
            </div>}
            {children}
        </section>
    );
}
