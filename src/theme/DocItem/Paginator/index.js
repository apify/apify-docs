import { useDoc } from '@docusaurus/plugin-content-docs/client';
import DocPaginator from '@theme/DocPaginator';
import React from 'react';

/**
 * Root of the course a page belongs to, e.g. `/academy/scraping-basics-python`
 */
function getCourseRoot(permalink) {
    return permalink.split('/').slice(0, 3).join('/');
}

/**
 * Show prev/next buttons only within a single course, so they don't lead
 * from the last lesson of one course to the first page of another
 */
export default function DocItemPaginator() {
    const { metadata } = useDoc();
    const courseRoot = getCourseRoot(metadata.permalink);
    const isInCourse = (link) => link && getCourseRoot(link.permalink) === courseRoot;
    const previous = isInCourse(metadata.previous) ? metadata.previous : undefined;
    const next = isInCourse(metadata.next) ? metadata.next : undefined;

    if (!previous && !next) {
        return null;
    }

    return <DocPaginator className="docusaurus-mt-lg" previous={previous} next={next} />;
}
