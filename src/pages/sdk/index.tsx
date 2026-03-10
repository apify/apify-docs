import Layout from '@theme/Layout';
import React from 'react';
import styled from 'styled-components';

import { theme } from '@apify/ui-library';

import Hero from '../../components/Hero/Hero';
import SdkSection from '../../components/SdkSection/SdkSection';
import Section from '../../components/Section/Section';
import UiLibraryWrapper from '../../components/UiLibraryWrapper';

const javascriptExample = `// The Apify SDK makes it easy to initialize the actor on the platform with the Actor.init() method,
// and to save the scraped data from your Actors to a dataset by simply using the Actor.pushData() method.

import { Actor } from 'apify';
import { PlaywrightCrawler } from 'crawlee';

await Actor.init();
const crawler = new PlaywrightCrawler({
    async requestHandler({ request, page, enqueueLinks }) {
        const title = await page.title();
        console.log(\`Title of $\{request.loadedUrl} is '$\{title}'\`);
        await Actor.pushData({ title, url: request.loadedUrl });
        await enqueueLinks();
    }
});
await crawler.run(['https://crawlee.dev']);
await Actor.exit();`;

const pythonExample = `# The Apify SDK makes it easy to read the actor input with the Actor.get_input() method,
# and to save the scraped data from your Actors to a dataset by simply using the Actor.push_data() method.

from apify import Actor
from bs4 import BeautifulSoup
import requests

async def main():
    async with Actor:
        actor_input = await Actor.get_input()
        response = requests.get(actor_input['url'])
        soup = BeautifulSoup(response.content, 'html.parser')
        await Actor.push_data({ 'url': actor_input['url'], 'title': soup.title.string })`;

const StyledContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${theme.space.space80};
`;

export default function Home() {
    return (
        <Layout>
            <UiLibraryWrapper>
                <Hero
                    heading="Apify SDK"
                    description={
                        <>
                            The Apify SDK is a toolkit for building Actors—serverless microservices running on the Apify platform.
                            Apify comes with first-class support for JavaScript/TypeScript and Python,
                            but you can run any containerized code as Actors.
                        </>
                    }
                />
                <Section>
                    <StyledContent>
                        <SdkSection
                            title="Apify SDK for JavaScript"
                            description="The official library for creating Apify Actors in Python, with full lifecycle management,
                            local storage, and event handling."
                            installCodeSnippet="npx apify-cli create my-crawler"
                            exampleCodeSnippet={javascriptExample}
                            language="JavaScript"
                            githubRepoUrl="https://github.com/apify/apify-sdk-js"
                            gettingStartedUrl="https://docs.apify.com/sdk/js/docs/guides/apify-platform"
                            referenceUrl="https://docs.apify.com/sdk/js/reference"
                        />
                        <SdkSection
                            title="Apify SDK for Python"
                            description="The official library for creating Apify Actors in Python, with full lifecycle management,
                            local storage, and event handling."
                            installCodeSnippet="apify create my-python-actor"
                            exampleCodeSnippet={pythonExample}
                            language="Python"
                            githubRepoUrl="https://github.com/apify/apify-sdk-python"
                            gettingStartedUrl="https://docs.apify.com/sdk/python/docs/overview"
                            referenceUrl="https://docs.apify.com/sdk/python/reference"
                        />
                    </StyledContent>
                </Section>
            </UiLibraryWrapper>
        </Layout>);
}
