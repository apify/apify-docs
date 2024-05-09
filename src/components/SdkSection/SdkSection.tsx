import { ActionLink, Button, CodeBlock, theme } from '@apify-packages/ui-library';
import { useColorMode } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';
import React from 'react';
import GitHubButton from 'react-github-btn';
import styled from 'styled-components';

import styles from './SdkSection.module.css';
import { Heading } from '../Heading';
import { Text } from '../Text';

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
        <div className={styles.SdkSection}>
            <div className={styles.SdkSectionDescription}>
                <div>
                    <div className={styles.SdkSectionTitle}>
                        <ThemedImage
                            height={24}
                            width={24}
                            sources={{ dark: useBaseUrl(`/img/${lowerCaseLanguage}-40x40.svg`), light: useBaseUrl(`/img/${lowerCaseLanguage}-40x40.svg`) }}
                        />
                        <Heading type="titleXl" style={{ verticalAlign: 'center' }}>{title}</Heading>
                    </div>
                    <Text size='medium' color={theme.color.neutral.textMuted}>
                        {description}
                    </Text>
                </div>
                <GitHubButton
                    href={githubRepoUrl}
                    data-color-scheme={colorMode}
                    data-size="large"
                    data-show-count="true"
                    aria-label={`Star apify/apify-sdk-${lowerCaseLanguage === 'javascript' ? 'js' : lowerCaseLanguage} on GitHub`}
                >
                    Star
                </GitHubButton>
                <div className={styles.SdkSectionActionButtons}>
                    <StyledButton hideExternalIcon color='success' to={gettingStartedUrl}>Get started</StyledButton>
                    <ActionLink hideExternalIcon to={referenceUrl} >{`${language} SDK Reference`}</ActionLink>
                </div>
            </div>
            <div className={styles.SdkSectionCodeExamples}>
                <CodeBlock language="bash" content={installCodeSnippet} />
                <CodeBlock language={lowerCaseLanguage} hideLineNumbers content={exampleCodeSnippet} fullHeight />
            </div>
        </div>
    );
}
