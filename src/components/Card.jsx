import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import styles from './Cards.module.css';

// TODO: Better sizing for logo images (in integrations)
const Card = ({ to, imageUrl, imageUrlDarkTheme, title, desc, smallImage }) => {
    const [themeIsDark, setThemeIsDark] = useState(true);
    const isDark = useColorMode().isDarkTheme;
    useEffect(() => {
        setThemeIsDark(isDark);
    }, [isDark]);

    return (
        <div className={clsx(styles.card, styles['card-hoverable'])}>
            <Link to={to}>
                {!imageUrl || (<div className={styles[smallImage ? 'card-image-container-small' : 'card-image-container']}>
                    <img src={imageUrlDarkTheme && themeIsDark ? imageUrlDarkTheme : imageUrl }/>
                </div>)}
                <div style={{ padding: '0px 1rem 1rem', paddingBottom: desc ? '1rem' : '0' }}>
                    <h4 style={{ fontSize: '120%' }}>{title}</h4>
                    {desc && <p style={{ color: 'var(--ifm-navbar-link-color)' }}>{desc}</p>}
                </div>
            </Link>
        </div>
    );
};

export default Card;
