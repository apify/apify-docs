import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { HorizontalTile, theme } from '@apify-packages/ui-components';
import styles from './styles.module.css';
import { Text } from '../Text';
import { Heading } from '../Heading';

import ArrowRight20 from '../../pages/img/arrow-right-20.svg';

interface ActionCardProps {
    title: string;
    titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    description?: string;
    to: string;
    width?: string;
}

export default function ActionCard({ title, description, to, width, titleAs = 'h3' }: ActionCardProps) {
    const { siteConfig } = useDocusaurusContext();
    const external = to.startsWith('http');

    const Tile = <HorizontalTile
        style={{ height: '100%' }}
        content={
            <div className={styles.actionCardContent}>
                <div className={styles.actionCardContentHeader}>
                    <Heading type='titleM' as={titleAs}>{title}</Heading>
                </div>
                <div className={styles.cardContentDescription}>
                    <Text align='left' color={theme.color.neutral.textSubtle}>{description}</Text>
                </div>
            </div>
        }
        isClickable
        action={<ArrowRight20 strokeWidth={1.5} /> }
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
