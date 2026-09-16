import React from 'react';

import { parseCodeBlockTitle } from '@docusaurus/theme-common/internal';
import MDXCode from '@theme-original/MDXComponents/Code';

import PromptButton from '@site/src/components/PromptButton';

const PROMPT_LANGUAGE_CLASS = 'language-prompt';

export default function Code(props) {
    if (props.className === PROMPT_LANGUAGE_CLASS && typeof props.children === 'string') {
        const title = parseCodeBlockTitle(props.metastring);
        return <PromptButton prompt={props.children.trim()} title={title || undefined} />;
    }

    return <MDXCode {...props} />;
}
