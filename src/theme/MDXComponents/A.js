import React from 'react';
import A from '@theme-original/MDXComponents/A';

/**
 * @param {string} input
 */
function isDifferentInstance(input) {
    const simplified = input.startsWith('/') ? input.slice(1) : input;

    const instanceUrls = [
        'api/client',
        'sdk',
        'cli',
    ];

    return instanceUrls.some((url) => simplified.startsWith(url));
}

/**
 * @param {HTMLLinkElement} props
 */
export default function AWrapper(props) {
    if (props.href && isDifferentInstance(props.href)) {
        return <a {...props} onClick={((e) => {
            e.preventDefault();
            window.location.assign(props.href);
        })}>
            {props.children}
        </a>;
    }

    return (
        <>
            <A {...props} />
        </>
    );
}
