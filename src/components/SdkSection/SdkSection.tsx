import { ActionLink, Button, CodeBlock, theme } from '@apify-packages/ui-library';
import { useColorMode } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';
import React from 'react';
import GitHubButton from 'react-github-btn';
import styled from 'styled-components';

import { Heading } from '../Heading';
import { Text } from '../Text';

const StyledButton = styled(Button)`
    font-weight: 650;
`;

const StyledSdkSection = styled.div`
    display: flex;
    gap: ${theme.space.space24};

    @media (max-width: ${theme.layout.tablet}) {
        flex-direction: column;
    }

    .SdkSectionTitle {
        display: flex;
        align-items: center;
        gap: ${theme.space.space8};
        margin-bottom: ${theme.space.space8};
    }

    .SdkSectionDescription {
        flex: 1 0 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: ${theme.space.space24};
    }

    .SdkSectionActionButtons {
        display: flex;
        align-items: center;
        gap: ${theme.space.space16};

        @media (max-width: ${theme.layout.tablet}) {
            flex-direction: column;
            align-items: flex-start;
        }
    }

    .SdkSectionCodeExamples {
        flex: 1 0 0;
        display: flex;
        flex-direction: column;
        gap: ${theme.space.space16};
        width: 50%;
    }
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
        <StyledSdkSection>
            <div className="SdkSectionDescription">
                <div>
                    <div className="SdkSectionTitle">
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
                <div className="SdkSectionActionButtons">
                    <StyledButton hideExternalIcon color='success' to={gettingStartedUrl}>Get started</StyledButton>
                    <ActionLink hideExternalIcon to={referenceUrl} >{`${language} SDK Reference`}</ActionLink>
                </div>
            </div>
            <div className="SdkSectionCodeExamples">
                <CodeBlock language="bash" content={installCodeSnippet} fullHeight />
                <CodeBlock language={lowerCaseLanguage} hideLineNumbers content={exampleCodeSnippet} />
            </div>
        </StyledSdkSection>
    );
}
