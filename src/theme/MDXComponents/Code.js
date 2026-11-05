import React from 'react';

import { parseCodeBlockTitle } from '@docusaurus/theme-common/internal';
import MDXCode from '@theme-original/MDXComponents/Code';

import PromptBlock from '@site/src/components/PromptBlock';

const PROMPT_LANGUAGE_CLASS = 'language-prompt';

// Matches a `collapsed` flag in the code fence metastring, e.g. ```prompt title="..." collapsed
// Quoted values are stripped first so a title containing the word doesn't count.
function isCollapsed(metastring = '') {
    const withoutQuotedValues = metastring.replace(/(["'])(?:(?!\1).)*\1/g, '');
    return /(?:^|\s)collapsed(?:\s|$)/.test(withoutQuotedValues);
}

export default function Code(props) {
    if (props.className === PROMPT_LANGUAGE_CLASS && typeof props.children === 'string') {
        const title = parseCodeBlockTitle(props.metastring);
        return (
            <PromptBlock
                prompt={props.children.trim()}
                title={title || undefined}
                collapsed={isCollapsed(props.metastring)}
            />
        );
    }

    return <MDXCode {...props} />;
}
