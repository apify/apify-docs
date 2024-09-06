import Link from '@docusaurus/Link';
import type { Props } from '@theme/TOCItems/Tree';
import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

// Recursive component rendering the toc tree
function TOCItemTree({
    toc,
    className,
    linkClassName,
    isChild,
}: Props): JSX.Element | null {
    if (!toc.length) {
        return null;
    }
    return (
        <ul className={isChild ? undefined : className}>
            {toc.map((heading) => (
                <li key={heading.id}>
                    <Link
                        to={`#${heading.id}`}
                        className={clsx(styles.apifyTocLink, linkClassName ?? undefined)}
                        data-label={heading.value}
                        // Developer provided the HTML, so assume it's safe.
                        dangerouslySetInnerHTML={{ __html: heading.value }}
                    />
                    <TOCItemTree
                        isChild
                        toc={heading.children}
                        className={className}
                        linkClassName={linkClassName}
                    />
                </li>
            ))}
        </ul>
    );
}

// Memo only the tree root is enough
export default React.memo(TOCItemTree);
