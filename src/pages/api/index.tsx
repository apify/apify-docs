import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import CodeBlock from '@theme/CodeBlock';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import React from 'react';
import styled from 'styled-components';

import { ActionLink, BlogArticle, Button, theme } from '@apify/ui-library';

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

// `Section` centers itself with auto margins, which stops it from stretching inside the
// page's flex column. Sections with wide children still fill the layout width, but one
// holding only text shrinks to fit its sentence, so it needs the width spelled out.
const TextOnlySection = styled(Section)`
    width: 100%;
`;

interface ExperimentalClient {
    language: string;
    description: string;
    repository: string;
    installLanguage: string;
    installSnippet: string;
    exampleLanguage: string;
    exampleSnippet: string;
}

const experimentalClients: ExperimentalClient[] = [
    {
        language: 'Go',
        description: 'Client for Go 1.23 or newer, built almost entirely on the standard library.',
        repository: 'https://github.com/apify/apify-client-go',
        installLanguage: 'bash',
        installSnippet: 'go get github.com/apify/apify-client-go',
        exampleLanguage: 'go',
        exampleSnippet: `package main

import (
    "context"
    "fmt"
    "log"

    apify "github.com/apify/apify-client-go"
)

func main() {
    client := apify.NewClient(apify.WithToken("MY-APIFY-TOKEN"))
    ctx := context.Background()

    // Starts an Actor and waits for it to finish.
    run, err := client.Actor("john-doe/my-cool-actor").Call(ctx, nil, apify.ActorStartOptions{}, nil)
    if err != nil {
        log.Fatal(err)
    }

    // Fetches results from the Actor's dataset.
    page, err := client.Dataset(run.DefaultDatasetID).ListItems(ctx, apify.DatasetListItemsOptions{})
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("Got %d items\\n", page.Total)
}`,
    },
    {
        language: 'PHP',
        description: 'Client for PHP 8.1 or newer, with Guzzle as the default HTTP transport.',
        repository: 'https://github.com/apify/apify-client-php',
        installLanguage: 'bash',
        installSnippet: 'composer require apify/apify-client',
        exampleLanguage: 'php',
        exampleSnippet: `<?php

use Apify\\Client\\ApifyClient;

$client = new ApifyClient('MY-APIFY-TOKEN');

// Starts an Actor and waits for it to finish.
$run = $client->actor('john-doe/my-cool-actor')->call(null, null, null);

// Fetches results from the Actor's dataset.
$items = $client->dataset((string) $run->getDefaultDatasetId())->listItems();
echo 'Got ' . $items->getCount() . ' items' . PHP_EOL;`,
    },
    {
        language: 'Java',
        description: 'Client for Java 17 or newer, published to Maven Central. Every call returns a CompletableFuture.',
        repository: 'https://github.com/apify/apify-client-java',
        installLanguage: 'xml',
        installSnippet: `<!-- pom.xml, or use com.apify:apify-client with Gradle -->
<dependency>
  <groupId>com.apify</groupId>
  <artifactId>apify-client</artifactId>
  <version>0.5.0</version>
</dependency>`,
        exampleLanguage: 'java',
        exampleSnippet: `import com.apify.client.ApifyClient;
import com.apify.client.actor.ActorStartOptions;
import com.apify.client.dataset.DatasetListItemsOptions;
import com.apify.client.run.ActorRun;

ApifyClient client = ApifyClient.create("MY-APIFY-TOKEN");

// Starts an Actor and waits for it to finish.
ActorRun run = client.actor("john-doe/my-cool-actor").call(null, new ActorStartOptions(), 120L).join();

// Fetches results from the Actor's dataset.
var items = client.dataset(run.getDefaultDatasetId()).listItems(new DatasetListItemsOptions()).join();
System.out.println("Got " + items.getCount() + " items");`,
    },
    {
        language: '.NET',
        description: 'Client for .NET 8.0 or newer, with cancellation-aware asynchronous calls.',
        repository: 'https://github.com/apify/apify-client-dotnet',
        installLanguage: 'bash',
        installSnippet: 'dotnet add package Apify.Client',
        exampleLanguage: 'csharp',
        exampleSnippet: `using System;
using Apify.Client;

var client = new ApifyClient("MY-APIFY-TOKEN");

// Starts an Actor and waits for it to finish.
var run = await client.Actor("john-doe/my-cool-actor").CallAsync(null, null, null);

// Fetches results from the Actor's dataset.
var items = await client.Dataset(run.DefaultDatasetId!).ListItemsAsync();
Console.WriteLine($"Got {items.Count} items");`,
    },
    {
        language: 'Rust',
        description: 'Async client for Tokio-based Rust applications, built on reqwest.',
        repository: 'https://github.com/apify/apify-client-rust',
        installLanguage: 'bash',
        installSnippet: `cargo add apify-client serde_json
cargo add tokio --features macros,rt-multi-thread`,
        exampleLanguage: 'rust',
        exampleSnippet: `use apify_client::ApifyClient;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = ApifyClient::new("MY-APIFY-TOKEN");

    // Starts an Actor and waits for it to finish.
    let run = client
        .actor("john-doe/my-cool-actor")
        .call::<serde_json::Value>(None, Default::default(), None)
        .await?;

    // Fetches results from the Actor's dataset.
    let dataset_id = run.default_dataset_id.expect("run has a default dataset");
    let items = client
        .dataset(&dataset_id)
        .list_items::<serde_json::Value>(Default::default())
        .await?;
    println!("Got {} items", items.items.len());

    Ok(())
}`,
    },
];

export default function Api() {
    return (
        <Layout>
            <UiLibraryWrapper>
                <Hero
                    heading="Apify API documentation"
                    description={
                        <>
                            Learn how to use the <Link to="/">Apify platform</Link> programmatically.
                        </>
                    }
                />
                <SectionWrapper
                    className={styles.LargerContent}
                    heading="REST API"
                    description={
                        <div className="MainSectionContent">
                            <p>
                                The Apify API is built around HTTP REST, uses predictable resource-oriented URLs,
                                returns JSON-encoded responses, and uses standard HTTP response codes, authentication,
                                and verbs.
                            </p>
                            <div>
                                <Button to="/api/v2">View API reference</Button>
                            </div>
                        </div>
                    }
                >
                    <ClientCodeWrapper>
                        <CodeBlock title="cURL" language="bash">
                            {`# Prepare Actor input and run it synchronously
echo '{ "searchStringsArray": ["Apify"] }' |
curl -X POST -d @- \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer <YOUR_API_TOKEN>' \\
  -L 'https://api.apify.com/v2/actors/compass~crawler-google-places/run-sync-get-dataset-items'
                           `}
                        </CodeBlock>
                    </ClientCodeWrapper>
                </SectionWrapper>
                <TextOnlySection
                    headingClassName={styles.ApiSectionHeading}
                    className={styles.LargerContent}
                    heading="OpenAPI schema"
                    description={
                        <>
                            You can download the complete OpenAPI schema of the Apify API in the{' '}
                            <Link to="https://docs.apify.com/api/openapi.yaml">YAML</Link> or{' '}
                            <Link to="https://docs.apify.com/api/openapi.json">JSON</Link> formats. The source code is
                            also{' '}
                            <Link to="https://github.com/apify/apify-docs/tree/master/apify-api/openapi">
                                available on GitHub
                            </Link>
                            .
                        </>
                    }
                />
                <Section
                    headingClassName={styles.ApiSectionHeading}
                    className={styles.LargerContent}
                    heading="API clients"
                    description="The client libraries are a more convenient way to interact with the Apify platform than the HTTP REST API."
                >
                    <Tabs
                        items={[
                            {
                                title: (
                                    <TabTitleWrapper>
                                        <ThemedImage
                                            height={16}
                                            width={16}
                                            sources={{
                                                dark: useBaseUrl('/img/javascript-40x40.svg'),
                                                light: useBaseUrl('/img/javascript-40x40.svg'),
                                            }}
                                        />
                                        JavaScript
                                    </TabTitleWrapper>
                                ),
                                content: (
                                    <SectionWrapper
                                        heading="JavaScript API client"
                                        headingAs="h3"
                                        description={
                                            <div className="Description">
                                                For web browser, JavaScript/TypeScript applications, Node.js, Deno, or
                                                Bun.
                                                <GitButton
                                                    href="https://github.com/apify/apify-client-js"
                                                    ariaLabel="Star apify/apify-client-js on GitHub"
                                                />
                                                <div className="DescriptionLinks">
                                                    <Button
                                                        color="success"
                                                        hideExternalIcon
                                                        to="https://docs.apify.com/api/client/js/docs"
                                                    >
                                                        Get started
                                                    </Button>
                                                    <ActionLink
                                                        hideExternalIcon
                                                        to="https://docs.apify.com/api/client/js/reference"
                                                    >
                                                        View reference
                                                    </ActionLink>
                                                </div>
                                            </div>
                                        }
                                    >
                                        <ClientCodeWrapper>
                                            <CodeBlock language="bash">npm install apify-client</CodeBlock>
                                            <CodeBlock language="javascript">
                                                {`// Easily run Actors, await them to finish using the convenient .call() method, and retrieve results from the resulting dataset.
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
                                title: (
                                    <TabTitleWrapper>
                                        <ThemedImage
                                            height={16}
                                            width={16}
                                            sources={{
                                                dark: useBaseUrl('/img/python-40x40.svg'),
                                                light: useBaseUrl('/img/python-40x40.svg'),
                                            }}
                                        />
                                        Python
                                    </TabTitleWrapper>
                                ),
                                content: (
                                    <SectionWrapper
                                        heading="Python API client"
                                        description={
                                            <div className="Description">
                                                For Python applications or notebooks.
                                                <GitButton
                                                    href="https://github.com/apify/apify-client-python"
                                                    ariaLabel="Star apify/apify-client-python on GitHub"
                                                />
                                                <div className="DescriptionLinks">
                                                    <Button
                                                        color="success"
                                                        hideExternalIcon
                                                        to="https://docs.apify.com/api/client/python/docs"
                                                    >
                                                        Get started
                                                    </Button>
                                                    <ActionLink
                                                        hideExternalIcon
                                                        to="https://docs.apify.com/api/client/python/reference"
                                                    >
                                                        View reference
                                                    </ActionLink>
                                                </div>
                                            </div>
                                        }
                                    >
                                        <ClientCodeWrapper>
                                            <CodeBlock language="bash">pip install apify-client</CodeBlock>
                                            <CodeBlock language="python">{`from apify_client import ApifyClient

apify_client = ApifyClient('MY-APIFY-TOKEN')

# Start an actor and wait for it to finish
actor_call = apify_client.actor('john-doe/my-cool-actor').call()

# Fetch results from the actor run's default dataset
dataset_items = apify_client.dataset(actor_call['defaultDatasetId']).list_items().items`}</CodeBlock>
                                        </ClientCodeWrapper>
                                    </SectionWrapper>
                                ),
                            },
                        ]}
                    />
                </Section>
                <Section
                    headingClassName={styles.ApiSectionHeading}
                    className={styles.LargerContent}
                    heading="Experimental API clients"
                    description="Clients for other languages are official Apify projects, but they are experimental: they are generated automatically from the OpenAPI schema. Review the code before you rely on them in production, and report issues on their repositories."
                >
                    <Tabs
                        items={experimentalClients.map((client) => ({
                            title: client.language,
                            content: (
                                <SectionWrapper
                                    heading={`${client.language} API client`}
                                    headingAs="h3"
                                    description={
                                        <div className="Description">
                                            {client.description}
                                            <div className="DescriptionLinks">
                                                <Button color="success" hideExternalIcon to={client.repository}>
                                                    Get started
                                                </Button>
                                                <ActionLink
                                                    hideExternalIcon
                                                    to={`${client.repository}/blob/master/docs/README.md`}
                                                >
                                                    View reference
                                                </ActionLink>
                                            </div>
                                        </div>
                                    }
                                >
                                    <ClientCodeWrapper>
                                        <CodeBlock language={client.installLanguage}>{client.installSnippet}</CodeBlock>
                                        <CodeBlock language={client.exampleLanguage}>{client.exampleSnippet}</CodeBlock>
                                    </ClientCodeWrapper>
                                </SectionWrapper>
                            ),
                        }))}
                    />
                </Section>
                <Section heading="Related articles">
                    <RelatedArticlesWrapper>
                        <a href="https://blog.apify.com/web-scraping-with-client-side-vanilla-javascript/">
                            <BlogArticle
                                imageNode={
                                    <BlogImageWrapper src="https://blog.apify.com/content/images/2022/03/vanilla-js-ice-cream-js.jpg" />
                                }
                                title="Web scraping with client-side Vanilla JavaScript"
                            />
                        </a>
                        <a href="https://blog.apify.com/apify-python-api-client/">
                            <BlogArticle
                                imageNode={
                                    <BlogImageWrapper src="https://blog.apify.com/content/images/2021/10/python.png" />
                                }
                                title="Apify ❤️ Python, so we’re releasing a Python API client"
                            />
                        </a>
                        <a href="https://blog.apify.com/api-for-dummies/">
                            <BlogArticle
                                imageNode={
                                    <BlogImageWrapper src="https://blog.apify.com/content/images/2024/02/API-for-dummies.png" />
                                }
                                title="API for dummies"
                            />
                        </a>
                    </RelatedArticlesWrapper>
                </Section>
            </UiLibraryWrapper>
        </Layout>
    );
}
