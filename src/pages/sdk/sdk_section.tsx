import { ActionLink, Button, CodeBlock, theme } from '@apify-packages/ui-library';
import { useColorMode } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';
import React from 'react';
import GitHubButton from 'react-github-btn';
import styled from 'styled-components';

import styles from './sdk_section.module.css';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';

const StyledButton = styled(Button)`
    font-weight: 650;
`;

interface SdkSectionProps {
    title: string;
    description: string;
    installCodeSnippet: string;
    exampleCodeSnippet: string;
    language: 'JavaScript' | 'Python';
    githubRepoUrl: string;
    gettingStartedUrl: string;
    referenceUrl: string;
}

export default function SdkSection({
    title,
    description,
    installCodeSnippet,
    exampleCodeSnippet,
    language,
    githubRepoUrl,
    gettingStartedUrl,
    referenceUrl,
}: SdkSectionProps) {
    const { colorMode } = useColorMode();
    const lowerCaseLanguage = language.toLowerCase();

    return (
        <div className={styles.sdkSection}>
            <div className={styles.sdkSectionDescription}>
                <Heading type="titleXl"><ThemedImage
                    height={24}
                    width={24}
                    sources={{ dark: useBaseUrl(`/img/${lowerCaseLanguage}-40x40.svg`), light: useBaseUrl(`/img/${lowerCaseLanguage}-40x40.svg`) }}
                /> {title}</Heading>
                <Text size='medium' color={theme.color.neutral.textMuted}>
                    {description}
                </Text>
                <GitHubButton
                    href={githubRepoUrl}
                    data-color-scheme={colorMode}
                    data-size="large"
                    data-show-count="true"
                    aria-label={`Star apify/apify-sdk-${lowerCaseLanguage} on GitHub`}
                >
                    Star
                </GitHubButton>
                <div className={styles.sdkSectionActionButtons}>
                    <StyledButton hideExternalIcon color='success' to={gettingStartedUrl}>Get started</StyledButton>
                    <ActionLink hideExternalIcon to={referenceUrl} >{`${language} SDK Reference`}</ActionLink>
                </div>
            </div>
            <div className={styles.sdkSectionCodeExamples}>
                <CodeBlock language="bash" content={installCodeSnippet} />
                <CodeBlock language={lowerCaseLanguage} hideLineNumbers content={exampleCodeSnippet} />
            </div>
        </div>
    );
}
