import { useColorMode } from '@docusaurus/theme-common';
import { GitHubButtonProps } from 'github-buttons';
import React, { PropsWithChildren } from 'react';
import GitHubButton from 'react-github-btn';

export default function GitButton(props: PropsWithChildren<GitHubButtonProps>) {
    const { colorMode } = useColorMode();
    return (
        <GitHubButton data-color-scheme={colorMode} {...props} />
    );
}
