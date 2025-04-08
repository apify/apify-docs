import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { useLocation } from '@docusaurus/router';
import { useColorMode, useWindowSize } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Giscus from '@giscus/react';
import ContentVisibility from '@theme/ContentVisibility';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import DocItemContent from '@theme/DocItem/Content';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocVersionBanner from '@theme/DocVersionBanner';
import clsx from 'clsx';
import React, { useCallback } from 'react';

import styles from './styles.module.css';

/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */
function useDocTOC() {
    const { frontMatter, toc } = useDoc();
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

function GiscusWrapper({ colorMode }) {
    return (
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
}

export default function DocItemLayout({ children }) {
    const docTOC = useDocTOC();
    const { metadata } = useDoc();
    const { colorMode } = useColorMode();
    const location = useLocation();
    const { siteConfig } = useDocusaurusContext();

    const { forbiddenGiscusDocRegExpStrings } = siteConfig.customFields;

    const shouldShowGiscus = useCallback((rxStrings) => {
        return rxStrings.some((rxs) => {
            const pathRegExp = new RegExp(rxs);
            const isForbidden = pathRegExp.test(location.pathname);
            return !isForbidden;
        });
    }, [location.pathname]);

    return (
        <div className="row">
            <div className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
                <ContentVisibility metadata={metadata} />
                <DocVersionBanner />
                <div className={styles.docItemContainer}>
                    <article>
                        <DocBreadcrumbs />
                        <DocVersionBadge />
                        {docTOC.mobile}
                        <DocItemContent>{children}</DocItemContent>
                        <DocItemFooter />
                    </article>
                    <DocItemPaginator />
                    {shouldShowGiscus(forbiddenGiscusDocRegExpStrings) && <GiscusWrapper colorMode={colorMode} />}
                </div>
            </div>
            {docTOC.desktop && <div className="col col--3">{docTOC.desktop}</div>}
        </div>
    );
}
