import { Banner, UiDependencyProvider, theme } from '@apify-packages/ui-library';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import React, { forwardRef } from 'react';
import styled from 'styled-components';

import SdkSection from './sdk_section';
import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import { Text } from '../../components/Text';

const javascriptExample = `// Apify SDK v3 uses named exports instead of the Apify object.
// You can import Dataset, KeyValueStore and more.
import { Actor } from 'apify';
// We moved all the crawling components to Crawlee.
// See the documentation on https://crawlee.dev
import { PlaywrightCrawler } from 'crawlee';

// Initialize the actor on the platform. This function connects your
// actor to platform events, storages and API. It replaces Apify.main()
await Actor.init();`;

const pythonExample = `# the Apify SDK makes it easy to read the actor input with the Actor.get_input() method,
# and to save scraped data from your actors to a dataset by simply using the Actor.push_data() method.

from apify import Actor
from bs4 import BeautifulSoup
import requests

async def main():
    async with Actor:
        actor_input = await Actor.get_input()
        response = requests.get(actor_input['url'])
        soup = BeautifulSoup(response.content, 'html.parser')
        await Actor.push_data({ 'url': actor_input['url'], 'title': soup.title.string })`;

const HeroWrapper = styled(Hero)`
        background-image: url("/img/hero_background.svg");
    `;

const SectionWrapper = styled(Section)`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: ${theme.space.space24};
        @media (min-width: ${theme.layout.desktop}) {
            flex-direction: row;
        }
        /* .Description {
            display: flex;
            flex-direction: column;
            gap: ${theme.space.space24};
        }
        .DescriptionLinks {
            display: flex;
            gap: ${theme.space.space16};
            a {
                font-weight: bold;
                text-wrap: nowrap;
                max-height: 36px;
            }
        }
        .MainSectionContent {
            display: flex;
            flex-direction: column;
            gap: ${theme.space.space16};
            a {
                text-wrap: nowrap;
                font-weight: bold;
                font-size: 14px;
                max-height: 36px;
            }
        } */
    `;

const StyledBanner = styled(Banner)`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${theme.space.space80};

    @media (max-width: ${theme.layout.tablet}) {
        /* width: 738px; */
        padding: 0 ${theme.space.space16} ${theme.space.space80} ${theme.space.space16};
    }

    @media (min-width: ${theme.layout.tablet}) {
        padding: ${theme.space.space40} ${theme.space.space24} ${theme.space.space80} ${theme.space.space24};
    }

    @media (min-width: ${theme.layout.largeDesktop}) {
        max-width: 1200px;
        padding: ${theme.space.space40} ${theme.space.space40} ${theme.space.space80} ${theme.space.space40};
    }
`;

export default function Home() {
    const WebInternalLink = forwardRef<HTMLAnchorElement, any >((props, ref) => <Link ref={ref} {...props} />);
    WebInternalLink.displayName = 'WebInternalLink';

    return (
        <UiDependencyProvider dependencies={{
            InternalLink: WebInternalLink,
            windowLocationHost: useBaseUrl(''),
            isHrefTrusted: () => true,
        }}>
            <Layout>
                <HeroWrapper
                    heading="Apify SDK"
                    isCentered
                    description={
                        <Text color={theme.color.neutral.textMuted} size='large'>
                            The Apify SDK is a toolkit for building Actors—serverless microservices running (not only) on the Apify platform.
                            Apify comes with first-class support for JavaScript/TypeScript and Python,
                            but you can run any containerized code on the Apify platform.
                        </Text>
                    }
                />
                <SectionWrapper>
                    <StyledBanner useGradientBackground={false} background='rgba(255, 255, 255, 0.6)'>
                        <SdkSection
                            title="SDK for JavaScript"
                            description="Toolkit for building Actors—serverless microservices running (not only) on the Apify platform."
                            installCodeSnippet="npx apify-cli create my-crawler"
                            exampleCodeSnippet={javascriptExample}
                            language="JavaScript"
                            githubRepoUrl="https://github.com/apify/apify-sdk-js"
                        />
                        <SdkSection
                            title="SDK for Python"
                            description="The Apify SDK for Python is the official library for creating Apify Actors in Python.
            It provides useful features like actor lifecycle management, local storage emulation, and actor event handling."
                            installCodeSnippet="apify create my-python-actor"
                            exampleCodeSnippet={pythonExample}
                            language="Python"
                            githubRepoUrl="https://github.com/apify/apify-sdk-python"
                        />
                    </StyledBanner>
                </SectionWrapper>
            </Layout>
        </UiDependencyProvider>);
}
