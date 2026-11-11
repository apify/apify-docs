import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';
import clsx from 'clsx';

import styles from './Cards.module.css';

const Card = ({ to, imageUrl, imageUrlDarkTheme, title, desc, smallImage }) => {
    const { colorMode } = useColorMode();
    const themeIsDark = colorMode === 'dark';

    return (
        <div className={clsx(styles.card, styles['card-hoverable'])}>
            <Link to={to} className={styles['card-link']}>
                {!imageUrl || (
                    <div className={styles[smallImage ? 'card-image-container-small' : 'card-image-container']}>
                        <img src={imageUrlDarkTheme && themeIsDark ? imageUrlDarkTheme : imageUrl} />
                    </div>
                )}
                <div className={styles['card-body']}>
                    <h4 className={styles['card-title']}>{title}</h4>
                    {desc && <p className={styles['card-desc']}>{desc}</p>}
                </div>
            </Link>
        </div>
    );
};

export default Card;
