import React from 'react';
import Link from '@docusaurus/Link';
import styles from './Cards.module.css';
import clsx from 'clsx';
// eslint-disable-next-line import/no-extraneosus-dependencies

const AcademyCard = ({ to, imageUrl, title, desc }) => {
    return (
        <div className={clsx(styles.card, styles['card-hoverable'])}>
            <Link to={to}>
                <div className={styles['card-image-container']}>
                    <img src={imageUrl} />
                </div>
                <div style={{ padding: '0px 1rem 1rem' }}>
                    <h4 style={{ fontSize: '120%' }}>{title}</h4>
                    <p style={{ color: 'var(--ifm-navbar-link-color)' }}>{desc}</p>
                </div>
            </Link>
        </div>
    );
};

export default AcademyCard;
