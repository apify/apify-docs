import { theme } from '@apify-packages/ui-library';
import clsx from 'clsx';
import React from 'react';

import styles from './styles.module.css';
import { Heading } from '../Heading';
import { Text } from '../Text';

interface SectionProps {
    heading?: string;
    description?: React.ReactNode;
    className?: string;
    headingClassName?: string;
    children?: React.ReactNode;
}

export default function Section({ heading, description, className, children, headingClassName }: SectionProps) {
    return (
        <section className={clsx(styles.section, className)}>
            {(heading || description) && <div className={styles.sectionHeader}>
                {heading && <Heading className={headingClassName} type='titleXl'>{heading}</Heading>}
                {description && <Text color={theme.color.neutral.textMuted}>{description}</Text>}
            </div>}
            {children}
        </section>
    );
}
