import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

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

    if (external) {
        return (
            <Link to={new URL(to, siteConfig.url).href} className={clsx(styles.card)} style={{ width }}>
                <div className={styles.cardContent}>
                    <div className={styles.cardIcon}>{icon}</div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
            </Link>
        );
    }

    return (
        <a href={new URL(to, siteConfig.url).href} className={clsx(styles.card)} style={{ width }}>
            <div className={styles.cardContent}>
                <div className={styles.cardIcon}>{icon}</div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </a>
    );
}
