import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import CodeBlock from '@theme/CodeBlock';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import React from 'react';
import styled from 'styled-components';

import {
    ActionLink,
    BlogArticle,
    Button,
    theme,
} from '@apify/ui-library';

import GitButton from '../../components/GitButton';
import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import Tabs from '../../components/Tabs';
import UiLibraryWrapper from '../../components/UiLibraryWrapper';
import styles from './styles.module.css';

const SectionWrapper = styled(Section)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: ${theme.space.space24};

    @media (min-width: ${theme.layout.tablet}) {
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
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.4rem;

    @media (min-width: ${theme.layout.tablet}) {
        flex-direction: row;
        grid-template-columns: 1fr 1fr;
    }

    @media (min-width: ${theme.layout.desktop}) {
        grid-template-columns: 1fr 1fr 1fr;
    }

    a {
        width: 100%;

        img {
            transition: transform 120ms;
        }

        &:hover {
            img {
                transform: scale(1.05);
            }
        }
    }
`;

const ClientCodeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${theme.space.space24};

    @media (min-width: ${theme.layout.tablet}) {
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
        <Layout>
            <UiLibraryWrapper>
                <Hero
                    heading="Apify API documentation"
                    description={<>Learn how to use the <Link to="/platform">Apify platform</Link> programmatically.</>}
                />
                <SectionWrapper
                    className={styles.LargerContent}
                    heading="API reference"
                    description={<div className="MainSectionContent">
                        <p>The Apify API is built around HTTP REST,
                            uses predictable resource-oriented URLs, returns JSON-encoded responses,
                            and uses standard HTTP response codes, authentication, and verbs.</p>
                        <div>
                            <Button to='/api/v2'>View API reference</Button>
                        </div>
                    </div>}
                >
                    <ClientCodeWrapper>
                        <CodeBlock title="cURL" language='bash'>
                            {`# Prepare Actor input and run it synchronously
echo '{ "searchStringsArray": ["Apify"] }' |
curl -X POST -d @- \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer <YOUR_API_TOKEN>' \\
  -L 'https://api.apify.com/v2/acts/compass~crawler-google-places/run-sync-get-dataset-items'
                           `}
                        </CodeBlock>
                    </ClientCodeWrapper>
                </SectionWrapper>
                <Section
                    headingClassName={styles.ApiSectionHeading}
                    className={styles.LargerContent}
                    heading="API clients"
                    description="The client libraries are a more convenient way to interact with the Apify platform than the HTTP REST API."
                >
                    <Tabs items={[
                        {
                            title: <TabTitleWrapper>
                                <ThemedImage
                                    height={16}
                                    width={16}
                                    sources={{ dark: useBaseUrl('/img/javascript-40x40.svg'), light: useBaseUrl('/img/javascript-40x40.svg') }}
                                />
                                JavaScript
                            </TabTitleWrapper>,
                            content: (
                                <SectionWrapper
                                    heading="JavaScript API client"
                                    headingAs="h3"
                                    description={<div className="Description">
                                    For web browser, JavaScript/TypeScript applications, Node.js, Deno, or Bun.
                                        <GitButton href="https://github.com/apify/apify-client-js" data-size="large" data-show-count="true">Star</GitButton>
                                        <div className="DescriptionLinks">
                                            <Button color="success" hideExternalIcon to='https://docs.apify.com/api/client/js/docs'>Get started</Button>
                                            <ActionLink hideExternalIcon to='https://docs.apify.com/api/client/js/reference'>Full reference</ActionLink>
                                        </div>
                                    </div>}
                                >
                                    <ClientCodeWrapper>
                                        <CodeBlock language="bash">
                                            npm install apify-client
                                        </CodeBlock>
                                        <CodeBlock
                                            language='javascript'

                                        >{`// Easily run Actors, await them to finish using the convenient .call() method, and retrieve results from the resulting dataset.
const { ApifyClient } = require('apify-client');

const client = new ApifyClient({
    token: 'MY-APIFY-TOKEN',
});

// Starts an actor and waits for it to finish.
const { defaultDatasetId } = await client.actor('john-doe/my-cool-actor').call();

// Fetches results from the actor's dataset.
const { items } = await client.dataset(defaultDatasetId).listItems();`}
                                        </CodeBlock>
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
                                Python
                            </TabTitleWrapper>,
                            content: (
                                <SectionWrapper
                                    heading="Python API client"
                                    description={<div className="Description">
                                        For Python applications or notebooks.
                                        <GitButton href="https://github.com/apify/apify-client-python" data-size="large" data-show-count="true">Star</GitButton>
                                        <div className="DescriptionLinks">
                                            <Button color="success" hideExternalIcon to='https://docs.apify.com/api/client/python/docs'>Get started</Button>
                                            <ActionLink hideExternalIcon to='https://docs.apify.com/api/client/python/reference'>Full reference</ActionLink>
                                        </div>
                                    </div>}
                                >
                                    <ClientCodeWrapper>
                                        <CodeBlock language="bash">pip install apify-client</CodeBlock>
                                        <CodeBlock
                                            language='python'
                                        >{`from apify_client import ApifyClient

apify_client = ApifyClient('MY-APIFY-TOKEN')

# Start an actor and wait for it to finish
actor_call = apify_client.actor('john-doe/my-cool-actor').call()

# Fetch results from the actor run's default dataset
dataset_items = apify_client.dataset(actor_call['defaultDatasetId']).list_items().items`}</CodeBlock></ClientCodeWrapper>
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
            </UiLibraryWrapper>
        </Layout>
    );
}
