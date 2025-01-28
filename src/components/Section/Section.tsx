import clsx from 'clsx';

import { theme } from '@apify-packages/ui-library';

import styles from './styles.module.css';
import { Heading } from '../Heading';
import { Text } from '../Text';

interface SectionProps {
    heading?: string;
    description?: React.ReactNode;
    className?: string;
    headingClassName?: string;
    children?: React.ReactNode;
    headingAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export default function Section({ heading, description, className, children, headingClassName, headingAs }: SectionProps) {
    return (
        <section className={clsx(styles.section, className)}>
            {(heading || description) && <div className={styles.sectionHeader}>
                {heading && <Heading className={headingClassName} type="title2Xl" as={headingAs || 'h2'}>{heading}</Heading>}
                {description && <Text color={theme.color.neutral.textMuted} size="large">{description}</Text>}
            </div>}
            {children}
        </section>
    );
}
