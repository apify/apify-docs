import clsx from 'clsx';
import React from 'react';

import styles from './styles.module.css';
import { Heading } from '../Heading';

interface HeroProps {
    heading: string;
    description: React.ReactNode | string;
    className?: string;
}

export default function Hero({ heading, description, className }: HeroProps) {
    return (
        <header className={clsx(styles.heroBanner, className)}>
            <div className={clsx(styles.heroBannerContent)}>
                <div>
                    <Heading type='title3Xl' className={styles.tagline}>{heading}</Heading>
                </div>
                <div className={clsx(styles.heroDescription)}>
                    {description}
                </div>
            </div>
        </header>
    );
}
