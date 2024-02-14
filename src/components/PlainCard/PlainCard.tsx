import { VerticalTile, theme } from '@apify-packages/ui-components';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';

import styles from './styles.module.css';
import { Heading } from '../Heading';
import { Text } from '../Text';

interface PlainCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    to: string;
    width?: string;
}

export default function PlainCard({ icon, title, description, to, width }: PlainCardProps) {
    const { siteConfig } = useDocusaurusContext();
    const external = to.startsWith('http');

    const Tile = <VerticalTile
        style={{ height: '100%' }}
        content={
            <div className={styles.plainCardContent}>
                {icon}
                <div className={styles.plainCardContentText}>
                    <Heading type='titleM'>{title}</Heading>
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
