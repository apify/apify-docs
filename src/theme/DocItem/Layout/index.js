import Link from '@docusaurus/Link';
import { useDoc, useDocsSidebar } from '@docusaurus/plugin-content-docs/client';
import { useWindowSize } from '@docusaurus/theme-common';
import ContentVisibility from '@theme/ContentVisibility';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocItemContent from '@theme/DocItemContent';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocVersionBanner from '@theme/DocVersionBanner';
import clsx from 'clsx';
import React from 'react';

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
    const desktop = canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? <DocItemTOCDesktop /> : undefined;
    return {
        hidden,
        mobile,
        desktop,
    };
}

/**
 * Academy tutorials belong to no sidebar, so they have no prev/next pagination and no breadcrumbs.
 * Show a single page-wide pagination box linking to the landing page instead
 */
function useIsTutorial() {
    const { metadata } = useDoc();
    const sidebar = useDocsSidebar();
    return !sidebar && metadata.tags.length > 0;
}

function TutorialsPaginator() {
    return (
        <nav className="pagination-nav docusaurus-mt-lg" aria-label="Docs pages">
            <Link className={clsx('pagination-nav__link', styles.allTutorialsLink)} to="/academy/tutorials">
                <div className="pagination-nav__sublabel">Tutorials</div>
                <div className="pagination-nav__label">Browse all tutorials by topic</div>
            </Link>
        </nav>
    );
}

export default function DocItemLayout({ children }) {
    const docTOC = useDocTOC();
    const { metadata } = useDoc();
    const isTutorial = useIsTutorial();

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
                    {isTutorial ? <TutorialsPaginator /> : <DocItemPaginator />}
                </div>
            </div>
            {docTOC.desktop && <div className="col col--3">{docTOC.desktop}</div>}
        </div>
    );
}
