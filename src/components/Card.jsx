import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './Cards.module.css';

// TODO: Better sizing for logo images (in integrations)
const Card = ({ to, imageUrl, title, desc, smallImage }) => {
    return (
        <div className={clsx(styles.card, styles['card-hoverable'])}>
            <Link to={to}>
                {!imageUrl || (<div className={styles[smallImage ? 'card-image-container-small' : 'card-image-container']}>
                    <img src={imageUrl}/>
                </div>)}
                <div style={{ padding: '0px 1rem 1rem' }}>
                    <h4 style={{ fontSize: '120%' }}>{title}</h4>
                    <p style={{ color: 'var(--ifm-navbar-link-color)' }}>{desc}</p>
                </div>
            </Link>
        </div>
    );
};

export default Card;
