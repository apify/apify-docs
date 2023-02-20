import React from 'react';
import Link from '@docusaurus/Link';
import ExternalLinkIcon from '../../apify-docs-theme/static/img/external-link.svg';
import styles from './Cards.module.css';

// eslint-disable-next-line import/no-extraneosus-dependencies

const PlatformLink = ({ cardItem, href, isExternalLink }) => (
    <Link to={href}>
        <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
            <span>🗒️</span>
            <span style={{ marginLeft: '0.5rem', marginRight: '0.3rem' }}>{cardItem}</span>
            {
                isExternalLink && (
                    <>
                        <span style={{ flex: 1 }}></span>
                        <span><ExternalLinkIcon /></span>
                    </>
                )
            }
        </span>
    </Link>
);

const PlaftormCard = ({ title, items }) => {
    return (
        <div className={styles.card}>
            <h4 className={styles['card-header']}>{title}</h4>
            <ul className={styles['card-links']}>
                {items.map((props, i) => (
                    <li key={i}>
                        <PlatformLink {...props} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlaftormCard;
