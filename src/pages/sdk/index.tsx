/* eslint-disable import/order */
import React from 'react';
import Layout from '@theme/Layout';

import { Banner, UiDependencyProvider, theme } from '@apify-packages/ui-library';

import styled from 'styled-components';
import { Text } from '../../components/Text';
import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import SdkSection from './sdk_section';

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

const StyledSection = styled(Section)`
    margin: 0;
    @media (max-width: ${theme.layout.largeDesktop}) {
        margin: 0;
    }
`;

const StyledBanner = styled(Banner)`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 80px;

    @media (max-width: ${theme.layout.tablet}) {
        /* width: 738px; */
        padding: 0 16px 80px 16px;
    }

    @media (min-width: ${theme.layout.tablet}) {
        padding: 40px 24px 80px 24px;
    }

    @media (min-width: ${theme.layout.largeDesktop}) {
        max-width: 1200px;
        padding: 40px 40px 80px 40px;
    }
`;

export default function Home() {
    return (
        <UiDependencyProvider dependencies={[]}>
            <Layout>
                <Hero
                    heading="Apify SDK"
                    description={
                        <Text color={theme.color.neutral.textMuted} size='large'>
                            The Apify SDK is a toolkit for building Actors—serverless microservices running (not only) on the Apify platform.
                            Apify comes with first-class support for JavaScript/TypeScript and Python,
                            but you can run any containerized code on the Apify platform.
                        </Text>
                    }
                />
                <StyledSection>
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
                </StyledSection>
            </Layout>
        </UiDependencyProvider>);
}
