import {
    ActionLink,
    BlogArticle,
    Button,
    theme,
} from '@apify-packages/ui-library';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import CodeBlock from '@theme/CodeBlock';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import React from 'react';
import styled from 'styled-components';

import styles from './styles.module.css';
import GitButton from '../../components/GitButton';
import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import Tabs from '../../components/Tabs';
import UiLibraryWrapper from '../../components/UiLibraryWrapper';

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

        .ImageWrapper {
            overflow: hidden;
        }

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
                    heading="Apify API"
                    description={<>Apify API provides programmatic access to the <Link to="/">Apify Platform</Link></>}
                />
                <SectionWrapper
                    className={styles.LargerContent}
                    heading="API reference"
                    description={<div className="MainSectionContent">
                        <p>The Apify API allows developers to interact programmatically apps using HTTP requests.
                        The Apify API is built around <Link to="https://en.wikipedia.org/wiki/REST">REST</Link>.</p>
                        <p>The API has predictable resource-oriented URLs, returns JSON-encoded responses,
                        and uses standard HTTP response codes, authentication, and verbs.</p>
                        <div>
                            <Button to='/api/v2'>Check API reference</Button>
                        </div>
                    </div>}
                >
                    <ClientCodeWrapper>
                        <CodeBlock title="cURL" language='bash'>
                            {`# Prepare Actor input
echo '{ "searchStringsArray": ["Apify"] }' > input.json

# Run the Actor and retreive its default dataset id.
curl -X POST -d @input.json -H 'Content-Type: application/json' \\
  -s -o >(tee run.json) \\
  https://api.apify.com/v2/acts/compass~crawler-google-places/runs?token=<YOUR_API_TOKEN>

# Find the defaultDatasetId in the API response 
cat run.json | jq -r .data.defaultDatasetId

# And pass it instead of <DATASET_ID>
curl https://api.apify.com/v2/datasets/<DATASET>/items?token=<YOUR_API_TOKEN>`
                            }
                        </CodeBlock>
                    </ClientCodeWrapper>
                </SectionWrapper>
                <Section
                    headingClassName={styles.ApiSectionHeading}
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
                                    headingAs="h3"
                                    description={<div className="Description">
                                    The official library to interact with Apify API from a web browser, Node.js, JavaScript, or Typescript applications.
                                        <GitButton href="https://github.com/apify/apify-client-js" data-size="large" data-show-count="true">Star</GitButton>
                                        <div className="DescriptionLinks">
                                            <Button color="success" hideExternalIcon to='https://docs.apify.com/api/client/js/docs'>Get started</Button>
                                            <ActionLink hideExternalIcon to='https://docs.apify.com/api/client/js/reference'>JavaScript client reference</ActionLink>
                                        </div>
                                    </div>}
                                >
                                    <ClientCodeWrapper>
                                        <CodeBlock language="bash">
                                            npm install apify-client
                                        </CodeBlock>
                                        <CodeBlock
                                            language='javascript'
                                        // eslint-disable-next-line max-len
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
                                Python Client
                            </TabTitleWrapper>,
                            content: (
                                <SectionWrapper
                                    heading="Python API client"
                                    description={<div className="Description">
                                        The official library to interact with Apify API from a Python applications.
                                        <GitButton href="https://github.com/apify/apify-client-python" data-size="large" data-show-count="true">Star</GitButton>
                                        <div className="DescriptionLinks">
                                            <Button color="success" hideExternalIcon to='https://docs.apify.com/api/client/python/docs'>Get started</Button>
                                            <ActionLink hideExternalIcon to='https://docs.apify.com/api/client/python/reference'>Python client reference</ActionLink>
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
