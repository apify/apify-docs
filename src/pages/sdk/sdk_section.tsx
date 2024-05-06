import { ActionLink, CodeBlock, theme } from '@apify-packages/ui-library';
import { useColorMode } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';
import React from 'react';
import GitHubButton from 'react-github-btn';
import styled from 'styled-components';

import styles from './index.module.css';
import Button, { BUTTON_SIZES, BUTTON_VARIANTS } from '../../components/Button';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';

const StyledSection = styled.div`
    display: flex;
    gap: ${theme.space.space24};

    @media (max-width: ${theme.layout.tablet}) {
        flex-direction: column;
    }
`;

const StyledButton = styled(Button)`
    padding: 8px 12px;
`;

interface SdkSectionProps {
    title: string;
    description: string;
    installCodeSnippet: string;
    exampleCodeSnippet: string;
    language: 'JavaScript' | 'Python';
    githubRepoUrl: string;
}

export default function SdkSection({ title, description, installCodeSnippet, exampleCodeSnippet, language, githubRepoUrl }: SdkSectionProps) {
    const { colorMode } = useColorMode();
    const lowerCaseLanguage = language.toLowerCase();

    return (
        <StyledSection>
            <div className={styles.sdkSectionDescription}>
                <Heading type="titleXl"><ThemedImage
                    height={16}
                    width={16}
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
                    <StyledButton variant={BUTTON_VARIANTS.SUCCESS} size={BUTTON_SIZES.SMALL}>Get started</StyledButton>
                    <ActionLink to='#' >{`${language} SDK Reference`}</ActionLink>
                </div>
            </div>
            <div className={styles.sdkSectionCodeExamples}>
                <CodeBlock language="bash" content={installCodeSnippet} />
                <CodeBlock language={lowerCaseLanguage} hideLineNumbers content={exampleCodeSnippet} />
            </div>
        </StyledSection>
    );
}
