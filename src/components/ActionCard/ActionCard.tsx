import { HorizontalTile, theme } from '@apify-packages/ui-library';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';
import styled from 'styled-components';

import styles from './styles.module.css';
import ArrowRight20 from '../../pages/img/arrow-right-20.svg';
import { Heading } from '../Heading';
import { Text } from '../Text';

const StyledHorizontalTile = styled(HorizontalTile)`
  height: 100%;
  & > * {
    display: inherit;
    }
`;

interface ActionCardProps {
    title: string;
    titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    description?: string;
    to: string;
    width?: string;
    iconSrc?: string;
}

export default function ActionCard({ title, description, to, width, iconSrc, titleAs = 'h3' }: ActionCardProps) {
    const { siteConfig } = useDocusaurusContext();
    const external = to.startsWith('http');

    const Tile = <StyledHorizontalTile

        content={
            <div className={styles.actionCardContent}>
                <div className={styles.actionCardContentHeader}>
                    {iconSrc && <img src={iconSrc} alt={title} width={24} height={24} />}
                    <Heading type='titleM' as={titleAs}>{title}</Heading>
                </div>
                { description && <div className={styles.cardContentDescription}>
                    <Text align='left' color={theme.color.neutral.textSubtle}>{description}</Text>
                </div>
                }
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
