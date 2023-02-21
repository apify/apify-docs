import React from 'react';
import clsx from 'clsx';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useThemeConfig } from '@docusaurus/theme-common';
import LinkItem from '@theme/Footer/LinkItem';
import styles from './index.module.css';

function FooterLinksColumn({ column }) {
    return (
        <>
            <div className={styles.footerTitle}>{column.title}</div>
            <ul className={clsx(styles.footerItem, 'clean-list')}>
                {column.items.map((item, i) => (
                    <li key={i} className="footer__item">
                        <LinkItem item={item} />
                    </li>
                ))}
            </ul>
        </>
    );
}

function Footer() {
    const { footer } = useThemeConfig();
    if (!footer) {
        return null;
    }
    const { links, style } = footer;
    return (
        <footer className={clsx(styles.footer, style)}>
            <div className="container padding-horiz--lg">
                <div className="row" style={{ justifyContent: 'space-between' }}>
                    { links.map((column, i) => (
                        <div key={i} className={`col col--2`}>
                            <FooterLinksColumn {...{ column }} />
                        </div>
                    ))
                    }
                </div>
                <div className="row padding-vert--md padding-top--lg">
                    <div className="col padding-vert--md col--6">
                        <a href="https://apify.com" target={'_blank'} rel={'dofollow'}>
                            <span className={styles.footerLogo}></span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default React.memo(Footer);
