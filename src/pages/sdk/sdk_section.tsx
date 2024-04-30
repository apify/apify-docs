/* eslint-disable import/order */
import React from 'react';
import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';
import GitHubButton from 'react-github-btn';

import { CodeBlock, theme } from '@apify-packages/ui-library';

import styled from 'styled-components';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import styles from './index.module.css';
import Button, { BUTTON_SIZES, BUTTON_VARIANTS } from '../../components/Button';

/* Icons */
import ArrowRight20 from '../img/arrow-right-20.svg';
import JavaScriptIcon from '/img/javascript-40x40.svg';
import PythonIcon from "/img/python-40x40.svg";

const StyledSection = styled.div`
    display: flex;
    gap: 24px;

    @media (max-width: ${theme.layout.tablet}) {
        flex-direction: column;
    }
`;

const StyledLink = styled(Link)`
    color: ${theme.color.neutral.textMuted};
    ${theme.typography.shared.desktop.titleM}

    svg {
        color: ${theme.color.neutral.textMuted};
        vertical-align: bottom;
    }
`;

const StyledButton = styled(Button)`
    padding: 8px 12px;
`;

const Icon = ({ language }: { language: string }) => {
    switch (language) {
        case 'javascript':
            return <JavaScriptIcon width={24} height={24} style={{ verticalAlign: 'bottom' }} />;
        case 'python':
            return <PythonIcon width={24} height={24} style={{ verticalAlign: 'bottom' }} />;
        default:
            return null;
    }
};

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

    return (
        <StyledSection>
            <div className={styles.sdkSectionDescription}>
                <Heading type="titleXl"><Icon language={language.toLowerCase()} /> {title}</Heading>
                <Text size='medium' color={theme.color.neutral.textMuted}>
                    {description}
                </Text>
                <GitHubButton
                    href={githubRepoUrl}
                    data-color-scheme={colorMode}
                    data-size="large"
                    data-show-count="true"
                    aria-label={`Star apify/apify-sdk-${language.toLowerCase()} on GitHub`}
                >
                    Star
                </GitHubButton>
                <div className={styles.sdkSectionActionButtons}>
                    <StyledButton variant={BUTTON_VARIANTS.SUCCESS} size={BUTTON_SIZES.SMALL}>Get started</StyledButton>
                    <StyledLink to='#' className={styles.referenceLink}>{`${language} SDK Reference`}<ArrowRight20 /></StyledLink>
                </div>
            </div>
            <div className={styles.sdkSectionCodeExamples}>
                <CodeBlock language="bash" content={installCodeSnippet} />
                <CodeBlock language={language.toLowerCase()} hideLineNumbers content={exampleCodeSnippet} />
            </div>
        </StyledSection>
    );
}
