import clsx from 'clsx';
import type React from 'react';

import { ArrowRightIcon } from '@apify/ui-icons';

import { Heading } from '../Heading';
import { Text } from '../Text';
import styles from './styles.module.css';

interface HeroPromotionProps {
    badge: string;
    label: string;
    labelMobile?: string;
    href: string;
}

function HeroPromotion({ badge, label, labelMobile, href }: HeroPromotionProps) {
    return (
        <a href={href} className={styles.heroPromotionLink}>
            <Text className={styles.heroPromotionBadge} as="span">
                {badge}
            </Text>
            <div className={styles.heroPromotionContent}>
                <Text className={styles.heroPromotionLabel} weight="medium">
                    <span className={styles.heroPromotionLabelDesktop}>
                        {label}
                    </span>
                    {labelMobile && (
                        <span className={styles.heroPromotionLabelMobile}>
                            {labelMobile}
                        </span>
                    )}
                </Text>
                <ArrowRightIcon
                    className={styles.heroPromotionArrow}
                    size="16"
                />
            </div>
        </a>
    );
}

interface HeroProps {
    heading: string;
    description: React.ReactNode | string;
    promotion?: HeroPromotionProps;
    className?: string;
}

export default function Hero({ heading, description, promotion, className }: HeroProps) {
    return (
        <header className={clsx(styles.heroBanner, className)}>
            <div className={clsx(styles.heroBannerContent)}>
                {promotion && <HeroPromotion {...promotion} />}
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
