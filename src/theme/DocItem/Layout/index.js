/* eslint-disable import/order */
import React from 'react';
import clsx from 'clsx';
import Giscus from '@giscus/react';
import { useWindowSize, useColorMode } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/theme-common/internal';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';

/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */
function useDocTOC() {
    const {
        frontMatter,
        toc,
    } = useDoc();
    const windowSize = useWindowSize();
    const hidden = frontMatter.hide_table_of_contents;
    const canRender = !hidden && toc.length > 0;
    const mobile = canRender ? <DocItemTOCMobile /> : undefined;
    const desktop = canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
        <DocItemTOCDesktop />
    ) : undefined;
    return {
        hidden,
        mobile,
        desktop,
    };
}

function shouldShowGiscus(rxStrings, pathname) {
    return rxStrings.some((rxs) => {
        const pathRegExp = new RegExp(rxs);
        const isForbidden = pathRegExp.test(pathname);
        return !isForbidden;
    });
}

export default function DocItemLayout({ children }) {
    const docTOC = useDocTOC();
    const { colorMode } = useColorMode();
    const location = useLocation();
    const { siteConfig } = useDocusaurusContext();
    const { forbiddenGiscusDocRegExpStrings } = siteConfig.customFields;
    const giscus = (
        <React.Fragment>
            <div className={styles.giscus}>
                <Giscus
                    id="giscus-comments"
                    repo="apify/apify-docs"
                    repoId="MDEwOlJlcG9zaXRvcnkxOTk0Njc5ODk="
                    category="Comments"
                    categoryId="DIC_kwDOC-Oj1c4CT-aW"
                    mapping="pathname"
                    reactionsEnabled="1"
                    emitMetadata="0"
                    inputPosition="top"
                    theme={colorMode}
                    lang="en"
                    strict="1"
                />
            </div>
        </React.Fragment>
    );
    return (
        <div
            className="row">
            <div
                className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
                <DocVersionBanner/>
                <div
                    className={styles.docItemContainer}>
                    <article>
                        <DocBreadcrumbs/>
                        <DocVersionBadge/>
                        {docTOC.mobile}
                        <DocItemContent>{children}</DocItemContent>
                        <DocItemFooter/>
                    </article>
                    <DocItemPaginator/>
                    {shouldShowGiscus(forbiddenGiscusDocRegExpStrings, location.pathname) && giscus}
                </div>
            </div>
            {docTOC.desktop && <div className="col col--3">{docTOC.desktop}</div>}
        </div>
    );
}
