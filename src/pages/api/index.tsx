import {
    BlogArticle,
    CodeBlock,
    theme,
} from '@apify-packages/ui-components';
import Layout from '@theme/Layout';
// @ts-expect-error - Ignoring ts error for importing React
import React from 'react';
import styled from 'styled-components';

import styles from './index.module.css';
import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import Tabs
    from '../../components/Tabs';

const SectionWrapper = styled(Section)`
    display: flex;
    justify-content: space-between;
    gap: ${theme.space.space24};

    .codeBlock {
        min-width: 50%;
        max-width: 50%;
    }
`;

export default function Api() {
    return (
        <Layout>
            <Hero
                heading="Apify API"
                description="Apify API provides useful features like automatic retries and convenience functions.\n
                It connects you with any Actors and their tasks either in the Store or your own."/>

            <SectionWrapper
                className={styles.river}
                heading="API reference"
                description={`
                The Apify API allows developers to interact programmatically with their Evervault apps using HTTP requests.
                    The Apify API is built around REST.
                    The API has predictable resource-oriented URLs, returns JSON-encoded responses,
                    and uses standard HTTP response codes, authentication, and verbs.`}
            >
                <CodeBlock className="codeBlock" content={`
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

curl "https://api.apify.com/v2/datasets/<DATASET_ID>/items?token=<YOUR_API_TOKEN>"`} language="python" hideLineNumbers defaultTabKey="cURL" />
            </SectionWrapper>
            <Section
                heading="API client"
                description="The official library to interact with Apify API from a web browser, Node.js, JavaScript, or Typescript applications."
            >
                <Tabs items={[
                    {
                        title: 'JavaScript Client',
                        content: (
                            <SectionWrapper
                                heading="JavaScript API client"
                                description=
                                    "The official library to interact with Apify API from a web browser, Node.js, JavaScript, or Typescript applications."
                            >
                                <CodeBlock
                                    className="codeBlock"
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
                                `} />
                            </SectionWrapper>
                        ),
                    },
                    {
                        title: 'Python Client',
                        content: (
                            <SectionWrapper
                                heading="Python API client"
                                description=
                                    "The official library to interact with Apify API from a Python applications."
                            >
                                <CodeBlock
                                    className="codeBlock"
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
                                `} />
                            </SectionWrapper>
                        ),
                    },
                ]} />
            </Section>
            <Section heading="Related articles">
                <div className={styles.river}>
                    <BlogArticle
                        imageNode={<img src='https://fastly.picsum.photos/id/687/384/216.jpg?hmac=c0MmDG_XBUiESdVUqqBB3HBNnGVBJiR79vGmSQNZP_c'/>}
                        title="Headless browsers: what are they and how do they work?"/>
                    <BlogArticle
                        imageNode={<img src="https://fastly.picsum.photos/id/687/384/216.jpg?hmac=c0MmDG_XBUiESdVUqqBB3HBNnGVBJiR79vGmSQNZP_c"/>}
                        title="Headless browsers: what are they and how do they work?"/>
                    <BlogArticle
                        imageNode={<img src="https://fastly.picsum.photos/id/687/384/216.jpg?hmac=c0MmDG_XBUiESdVUqqBB3HBNnGVBJiR79vGmSQNZP_c"/>}
                        title="Headless browsers: what are they and how do they work?"/>
                </div>
            </Section>
        </Layout>
    );
}
