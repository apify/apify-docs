import clsx from 'clsx';
import React from 'react';

import styles from './styles.module.css';
import { Heading } from '../Heading';

interface HeroProps {
    heading: string;
    description: React.ReactNode | string;
}

export default function Hero({ heading, description }: HeroProps) {
    return (
        <header className={clsx(styles.heroBanner)}>
            <div className={styles.heroBannerContent}>
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
