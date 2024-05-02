import {
    ActionLink,
    BlogArticle,
    Button,
    CodeBlock,
    theme,
    UiDependencyProvider,
} from '@apify-packages/ui-library';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import React from 'react';
import GitHubButton from 'react-github-btn';
import styled from 'styled-components';

import styles from './styles.module.css';
import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import Tabs from '../../components/Tabs';

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

    .Description {
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
    }
`;

const RelatedArticlesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    @media (min-width: ${theme.layout.desktop}) {
        flex-direction: row;
    }

    a {
        width: 100%;
    }
`;

const ClientCodeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${theme.space.space24};

    @media (min-width: ${theme.layout.desktop}) {
        max-width: 50%;
    }
`;

const TabTitleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: ${theme.space.space8};
`;

const BlogImageWrapper = styled.img`
    border-radius: 12px;
    height: 100%;
`;

export default function Api() {
    return (
        <UiDependencyProvider dependencies={{
            InternalLink: (props) => <Link {...props} />,
            windowLocationHost: window.location.host,
            isHrefTrusted: () => true,
        }}>
            <Layout>
                <HeroWrapper
                    heading="Apify API"
                    isCentered
                    description={<>Apify API provides useful features like automatic retries and convenience functions.<br/>
                It connects you with any Actors and their tasks either in the Store or your own.</>}
                />
                <SectionWrapper
                    className={styles.LargerContent}
                    heading="API reference"
                    description={<div className="MainSectionContent">
                    The Apify API allows developers to interact programmatically apps using HTTP requests.
                    The Apify API is built around REST.
                    The API has predictable resource-oriented URLs, returns JSON-encoded responses,
                    and uses standard HTTP response codes, authentication, and verbs.
                        <div>
                            <Button to='/api/v2'>Check API reference</Button>
                        </div>
                    </div>}
                >
                    <ClientCodeWrapper>
                        <CodeBlock content={[{ key: 'cURL', label: 'cURL', language: 'bash', code: `
                # Prepare Actor input

cat > input.json <<'EOF'
{
 // Define the input in JSON here
}
EOF

# Run the Actor
curl "https://api.apify.com/v2/acts/username~actorname/runs?token=<YOUR_API_TOKEN>" \\
  -X POST \\
  -d @input.json \\
  -H 'Content-Type: application/json'

# Use the defaultDatasetId from response and pass it instead of <DATASET_ID>

curl "https://api.apify.com/v2/datasets/<DATASET_ID>/items?token=<YOUR_API_TOKEN>"` }]} hideBashPromptPrefixes hideLineNumbers defaultTabKey="cURL" />
                    </ClientCodeWrapper>
                </SectionWrapper>
                <Section
                    className={styles.LargerContent}
                    heading="API client"
                    description="The official library to interact with Apify API."
                >
                    <Tabs items={[
                        {
                            title: <TabTitleWrapper>
                                <ThemedImage
                                    height={16}
                                    width={16}
                                    sources={{ dark: useBaseUrl('/img/javascript-40x40.svg'), light: useBaseUrl('/img/javascript-40x40.svg') }}
                                />
                                JavaScript Client
                            </TabTitleWrapper>,
                            content: (
                                <SectionWrapper
                                    heading="JavaScript API client"
                                    description={<div className="Description">
                                    The official library to interact with Apify API from a web browser, Node.js, JavaScript, or Typescript applications.
                                        <GitHubButton href="https://github.com/apify/apify-client-js" data-color-scheme="no-preference: light; light: light; dark: dark;" data-size="large" data-show-count="true">Star</GitHubButton>
                                        <div className="DescriptionLinks">
                                            <Button to='/api/client/js/docs'>Get started</Button>
                                            <ActionLink to='/api/client/js'>JavaScript client reference</ActionLink>
                                        </div>
                                    </div>}
                                >
                                    <ClientCodeWrapper>
                                        <CodeBlock content='npm install apify-client' language="bash"/>
                                        <CodeBlock
                                            language='javascript'
                                            hideLineNumbers
                                            content={`
// Easily run Actors, await them to finish using the convenient .call() method, and retrieve results from the resulting dataset.

const { ApifyClient } = require('apify-client');

const client = new ApifyClient({
    token: 'MY-APIFY-TOKEN',
});

// Starts an actor and waits for it to finish.
const { defaultDatasetId } = await client.actor('john-doe/my-cool-actor').call();

// Fetches results from the actor's dataset.
const { items } = await client.dataset(defaultDatasetId).listItems();
                                `}/>
                                    </ClientCodeWrapper>
                                </SectionWrapper>
                            ),
                        },
                        {
                            title: <TabTitleWrapper>
                                <ThemedImage
                                    height={16}
                                    width={16}
                                    sources={{ dark: useBaseUrl('/img/python-40x40.svg'), light: useBaseUrl('/img/python-40x40.svg') }}
                                />
                                Python Client
                            </TabTitleWrapper>,
                            content: (
                                <SectionWrapper
                                    heading="Python API client"
                                    description={<div className="Description">
                                        The official library to interact with Apify API from a Python applications.
                                        <GitHubButton href="https://github.com/apify/apify-client-python" data-color-scheme="no-preference: light; light: light; dark: dark;" data-size="large" data-show-count="true">Star</GitHubButton>
                                        <div className="DescriptionLinks">
                                            <Button to='/api/client/python/docs'>Get started</Button>
                                            <ActionLink to='/api/client/python'>Python client reference</ActionLink>
                                        </div>
                                    </div>}
                                >
                                    <ClientCodeWrapper>
                                        <CodeBlock content='pip install apify-client' language="bash"/>
                                        <CodeBlock
                                            className="codeBlock"
                                            language='python'
                                            hideLineNumbers
                                            content={`
from apify_client import ApifyClient

apify_client = ApifyClient('MY-APIFY-TOKEN')

# Start an actor and wait for it to finish
actor_call = apify_client.actor('john-doe/my-cool-actor').call()

# Fetch results from the actor run's default dataset
dataset_items = apify_client.dataset(actor_call['defaultDatasetId']).list_items().items
                                `}/></ClientCodeWrapper>
                                </SectionWrapper>
                            ),
                        },
                    ]} />
                </Section>
                <Section heading="Related articles">
                    <RelatedArticlesWrapper>
                        <a href="https://blog.apify.com/web-scraping-with-client-side-vanilla-javascript/">
                            <BlogArticle
                                imageNode={<BlogImageWrapper src="https://blog.apify.com/content/images/2022/03/vanilla-js-ice-cream-js.jpg"/>}
                                title="Web scraping with client-side Vanilla JavaScript"/>
                        </a>
                        <a href="https://blog.apify.com/apify-python-api-client/">
                            <BlogArticle
                                imageNode={<BlogImageWrapper src="https://blog.apify.com/content/images/2021/10/python.png" />}
                                title="Apify ❤️ Python, so we’re releasing a Python API client"/>
                        </a>
                        <a href="https://blog.apify.com/api-for-dummies/">
                            <BlogArticle
                                imageNode={<BlogImageWrapper src="https://blog.apify.com/content/images/2024/02/API-for-dummies.png" />}
                                title="API for dummies"/>
                        </a>
                    </RelatedArticlesWrapper>
                </Section>
            </Layout>
        </UiDependencyProvider>
    );
}
