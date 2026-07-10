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
                                                    data-size="large"
                                                    data-show-count="true"
                                                >
                                                    Star
                                                </GitButton>
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
                                                {/* This is a hotfix for invalid width, sorry neither me nor Claude can do better :) */}
                                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                                &nbsp;
                                                <GitButton
                                                    href="https://github.com/apify/apify-client-python"
                                                    data-size="large"
                                                    data-show-count="true"
                                                >
                                                    Star
                                                </GitButton>
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
                            {
                                title: (
                                    <TabTitleWrapper>
                                        <ThemedImage
                                            height={16}
                                            width={16}
                                            sources={{
                                                dark: useBaseUrl('/img/go-40x40.svg'),
                                                light: useBaseUrl('/img/go-40x40.svg'),
                                            }}
                                        />
                                        Go
                                    </TabTitleWrapper>
                                ),
                                content: (
                                    <SectionWrapper
                                        heading="Go API client"
                                        headingAs="h3"
                                        description={
                                            <div className="Description">
                                                For Go applications. This client is experimental.
                                                <GitButton
                                                    href="https://github.com/apify/apify-client-go"
                                                    data-size="large"
                                                    data-show-count="true"
                                                >
                                                    Star
                                                </GitButton>
                                                <div className="DescriptionLinks">
                                                    <Button
                                                        color="success"
                                                        hideExternalIcon
                                                        to="https://github.com/apify/apify-client-go"
                                                    >
                                                        View on GitHub
                                                    </Button>
                                                </div>
                                            </div>
                                        }
                                    >
                                        <ClientCodeWrapper>
                                            <CodeBlock language="bash">go get github.com/apify/apify-client-go</CodeBlock>
                                            <CodeBlock language="go">{`package main

import (
    "context"
    "fmt"
    "log"

    apify "github.com/apify/apify-client-go"
)

func main() {
    client := apify.NewClient("MY-APIFY-TOKEN")
    ctx := context.Background()

    // Start an Actor and wait for it to finish.
    waitSecs := int64(120)
    run, err := client.Actor("john-doe/my-cool-actor").Call(ctx, nil, apify.ActorStartOptions{}, &waitSecs)
    if err != nil {
        log.Fatal(err)
    }

    // Fetch results from the run's default dataset.
    page, err := client.Dataset(run.DefaultDatasetID).ListItems(ctx, apify.DatasetListItemsOptions{})
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("Got %d items\\n", page.Count)
}`}</CodeBlock>
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
                                                dark: useBaseUrl('/img/php-40x40.svg'),
                                                light: useBaseUrl('/img/php-40x40.svg'),
                                            }}
                                        />
                                        PHP
                                    </TabTitleWrapper>
                                ),
                                content: (
                                    <SectionWrapper
                                        heading="PHP API client"
                                        headingAs="h3"
                                        description={
                                            <div className="Description">
                                                For PHP applications. This client is experimental.
                                                <GitButton
                                                    href="https://github.com/apify/apify-client-php"
                                                    data-size="large"
                                                    data-show-count="true"
                                                >
                                                    Star
                                                </GitButton>
                                                <div className="DescriptionLinks">
                                                    <Button
                                                        color="success"
                                                        hideExternalIcon
                                                        to="https://github.com/apify/apify-client-php"
                                                    >
                                                        View on GitHub
                                                    </Button>
                                                </div>
                                            </div>
                                        }
                                    >
                                        <ClientCodeWrapper>
                                            <CodeBlock language="bash">composer require apify/apify-client</CodeBlock>
                                            <CodeBlock language="php">{`<?php

$client = new ApifyClient('MY-APIFY-TOKEN');

// Start an Actor and wait for it to finish
$run = $client->actor('john-doe/my-cool-actor')->call();

// Fetch results from the run's default dataset
$items = $client->dataset($run->getDefaultDatasetId())->listItems();
echo 'Item count: ' . $items->getCount() . PHP_EOL;`}</CodeBlock>
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
                                                dark: useBaseUrl('/img/java-40x40.svg'),
                                                light: useBaseUrl('/img/java-40x40.svg'),
                                            }}
                                        />
                                        Java
                                    </TabTitleWrapper>
                                ),
                                content: (
                                    <SectionWrapper
                                        heading="Java API client"
                                        headingAs="h3"
                                        description={
                                            <div className="Description">
                                                For Java applications. This client is experimental.
                                                <GitButton
                                                    href="https://github.com/apify/apify-client-java"
                                                    data-size="large"
                                                    data-show-count="true"
                                                >
                                                    Star
                                                </GitButton>
                                                <div className="DescriptionLinks">
                                                    <Button
                                                        color="success"
                                                        hideExternalIcon
                                                        to="https://github.com/apify/apify-client-java"
                                                    >
                                                        View on GitHub
                                                    </Button>
                                                </div>
                                            </div>
                                        }
                                    >
                                        <ClientCodeWrapper>
                                            <CodeBlock language="xml" title="Maven">{`<dependency>
  <groupId>com.apify</groupId>
  <artifactId>apify-client</artifactId>
  <version>0.1.1</version>
</dependency>`}</CodeBlock>
                                            <CodeBlock language="java">{`ApifyClient client = ApifyClient.create("MY-APIFY-TOKEN");

// Start an Actor and wait for it to finish (120-second timeout)
ActorRun run = client.actor("john-doe/my-cool-actor")
    .call(null, new ActorStartOptions(), 120L);

// Fetch results from the run's default dataset
PaginationList<JsonNode> items = client.dataset(run.getDefaultDatasetId())
    .listItems(new DatasetListItemsOptions());
System.out.println("Item count: " + items.getCount());`}</CodeBlock>
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
                                                dark: useBaseUrl('/img/dotnet-40x40.svg'),
                                                light: useBaseUrl('/img/dotnet-40x40.svg'),
                                            }}
                                        />
                                        .NET
                                    </TabTitleWrapper>
                                ),
                                content: (
                                    <SectionWrapper
                                        heading=".NET API client"
                                        headingAs="h3"
                                        description={
                                            <div className="Description">
                                                For .NET applications. This client is experimental.
                                                <GitButton
                                                    href="https://github.com/apify/apify-client-dotnet"
                                                    data-size="large"
                                                    data-show-count="true"
                                                >
                                                    Star
                                                </GitButton>
                                                <div className="DescriptionLinks">
                                                    <Button
                                                        color="success"
                                                        hideExternalIcon
                                                        to="https://github.com/apify/apify-client-dotnet"
                                                    >
                                                        View on GitHub
                                                    </Button>
                                                </div>
                                            </div>
                                        }
                                    >
                                        <ClientCodeWrapper>
                                            <CodeBlock language="bash">dotnet add package Apify.Client</CodeBlock>
                                            <CodeBlock language="csharp">{`using Apify.Client;

var client = new ApifyClient("MY-APIFY-TOKEN");

// Start an Actor and wait for it to finish
var run = await client.Actor("john-doe/my-cool-actor").CallAsync();

// Fetch results from the run's default dataset
var items = await client.Dataset(run.DefaultDatasetId!).ListItemsAsync();
Console.WriteLine($"Item count: {items.Count}");`}</CodeBlock>
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
                                                dark: useBaseUrl('/img/rust-40x40.svg'),
                                                light: useBaseUrl('/img/rust-40x40.svg'),
                                            }}
                                        />
                                        Rust
                                    </TabTitleWrapper>
                                ),
                                content: (
                                    <SectionWrapper
                                        heading="Rust API client"
                                        headingAs="h3"
                                        description={
                                            <div className="Description">
                                                For Rust applications. This client is experimental.
                                                <GitButton
                                                    href="https://github.com/apify/apify-client-rust"
                                                    data-size="large"
                                                    data-show-count="true"
                                                >
                                                    Star
                                                </GitButton>
                                                <div className="DescriptionLinks">
                                                    <Button
                                                        color="success"
                                                        hideExternalIcon
                                                        to="https://github.com/apify/apify-client-rust"
                                                    >
                                                        View on GitHub
                                                    </Button>
                                                </div>
                                            </div>
                                        }
                                    >
                                        <ClientCodeWrapper>
                                            <CodeBlock language="toml" title="Cargo.toml">{`[dependencies]
apify-client = "0.5"
tokio = { version = "1", features = ["macros", "rt-multi-thread"] }
serde_json = "1"`}</CodeBlock>
                                            <CodeBlock language="rust">{`use apify_client::ApifyClient;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = ApifyClient::new("MY-APIFY-TOKEN");

    // Start an Actor and wait for it to finish
    let run = client
        .actor("john-doe/my-cool-actor")
        .call::<serde_json::Value>(None, Default::default(), None)
        .await?;

    // Read items from the run's default dataset
    if let Some(dataset_id) = &run.default_dataset_id {
        let items = client
            .dataset(dataset_id)
            .list_items::<serde_json::Value>(Default::default())
            .await?;
        println!("Got {} items", items.items.len());
    }
    Ok(())
}`}</CodeBlock>
                                        </ClientCodeWrapper>
                                    </SectionWrapper>
                                ),
                            },
                        ]}
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
