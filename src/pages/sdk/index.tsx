import { theme } from '@apify-packages/ui-library';
import Layout from '@theme/Layout';
import React from 'react';
import styled from 'styled-components';

import Hero from '../../components/Hero/Hero';
import SdkSection from '../../components/SdkSection/SdkSection';
import Section from '../../components/Section/Section';
import UiLibraryWrapper from '../../components/UiLibraryWrapper';

const javascriptExample = `// Apify SDK v3 uses named exports instead of the Apify object.
// You can import Dataset, KeyValueStore and more.
import { Actor } from 'apify';
// We moved all the crawling components to Crawlee.
// See the documentation on https://crawlee.dev
import { PlaywrightCrawler } from 'crawlee';

// Initialize the actor on the platform. This function connects your
// actor to platform events, storages and API. It replaces Apify.main()
await Actor.init();

const crawler = new PlaywrightCrawler({
    // handle(Page|Request)Functions of all Crawlers
    // are now simply called a requestHandler.
    async requestHandler({ request, page, enqueueLinks }) {
        const title = await page.title();
        console.log(\`Title of $\{request.loadedUrl} is '$\{title}'\`);
        // Use Actor instead of the Apify object to save data.
        await Actor.pushData({ title, url: request.loadedUrl });
        // We simplified enqueuing links a lot, see the docs.
        // This way the function adds only links to same hostname.
        await enqueueLinks();
    }
});
// You can now add requests to the queue directly from the run function.
// No need to create an instance of the queue separately.
await crawler.run(['https://crawlee.dev']);
// This function disconnects the actor from the platform
// and optionally sends an exit message.
await Actor.exit();`;

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

const StyledContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${theme.space.space80};

    @media (max-width: ${theme.layout.tablet}) {
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
    return (
        <Layout>
            <UiLibraryWrapper>
                <HeroWrapper
                    heading="Apify SDK"
                    isCentered
                    description={
                        <>
                            The Apify SDK is a toolkit for building Actors—serverless microservices running (not only) on the Apify platform.
                            Apify comes with first-class support for JavaScript/TypeScript and Python,
                            but you can run any containerized code on the Apify platform.
                        </>
                    }
                />
                <Section>
                    <StyledContent>
                        <SdkSection
                            title="SDK for JavaScript"
                            description="Toolkit for building Actors—serverless microservices running (not only) on the Apify platform."
                            installCodeSnippet="npx apify-cli create my-crawler"
                            exampleCodeSnippet={javascriptExample}
                            language="JavaScript"
                            githubRepoUrl="https://github.com/apify/apify-sdk-js"
                            gettingStartedUrl="https://docs.apify.com/sdk/js/docs/guides/apify-platform"
                            referenceUrl="https://docs.apify.com/sdk/js/reference"
                        />
                        <SdkSection
                            title="SDK for Python"
                            description="The Apify SDK for Python is the official library for creating Apify Actors in Python.
            It provides useful features like actor lifecycle management, local storage emulation, and actor event handling."
                            installCodeSnippet="apify create my-python-actor"
                            exampleCodeSnippet={pythonExample}
                            language="Python"
                            githubRepoUrl="https://github.com/apify/apify-sdk-python"
                            gettingStartedUrl="https://docs.apify.com/sdk/python/docs/overview/introduction"
                            referenceUrl="https://docs.apify.com/sdk/python/reference"
                        />
                    </StyledContent>
                </Section>
            </UiLibraryWrapper>
        </Layout>);
}
