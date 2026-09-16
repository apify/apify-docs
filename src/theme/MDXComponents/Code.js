import React from 'react';

import MDXCode from '@theme-original/MDXComponents/Code';

import PromptButton from '@site/src/components/PromptButton';

const PROMPT_LANGUAGE_CLASS = 'language-prompt';

export default function Code(props) {
    if (props.className === PROMPT_LANGUAGE_CLASS && typeof props.children === 'string') {
        return <PromptButton prompt={props.children.trim()} />;
    }

    return <MDXCode {...props} />;
}
