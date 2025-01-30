import { useColorMode } from '@docusaurus/theme-common';
import type { GitHubButtonProps } from 'github-buttons';
import type { PropsWithChildren } from 'react';
import GitHubButton from 'react-github-btn';

export default function GitButton(props: PropsWithChildren<GitHubButtonProps>) {
    const { colorMode } = useColorMode();
    return (
        <GitHubButton data-color-scheme={colorMode} {...props} />
    );
}
