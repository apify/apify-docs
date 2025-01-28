import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';

import { VerticalTile, theme } from '@apify-packages/ui-library';

import styles from './styles.module.css';
import { Heading } from '../Heading';
import { Text } from '../Text';

interface CardWithIconProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    to: string;
    width?: string;
}

export default function CardWithIcon({ icon, title, description, to, width }: CardWithIconProps) {
    const { siteConfig } = useDocusaurusContext();
    const external = to.startsWith('http');

    const Tile = <VerticalTile style={{ height: '100%' }}
        content={
            <div className={styles.cardContent}>
                <div className={styles.cardContentHeader}>
                    {icon}
                    <Heading type='titleM'>{title}</Heading>
                </div>
                <div className={styles.cardContentDescription}>
                    <Text align='left' color={theme.color.neutral.textSubtle}>{description}</Text>
                </div>
            </div>
        }
        isClickable
    />;

    if (external) {
        return (
            <Link to={new URL(to, siteConfig.url).href} style={{ width }}>
                {Tile}
            </Link>
        );
    }

    return (
        <a href={new URL(to, siteConfig.url).href} style={{ width }}>
            {Tile}
        </a>
    );
}
