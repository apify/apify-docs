/* eslint-disable max-len */
import React from 'react';
import Layout from '@theme/Layout';

import styles from './index.module.css';
import Hero from '../components/Hero/Hero';
import Section from '../components/Section/Section';
import CardWithIcon from '../components/CardWithIcon/CardWithIcon';
import ChangeLog from '../components/ChangeLog/ChangeLog';

/* Icons */
import LearnIcon from './img/learn.svg';
import BookCodeIcon from './img/book-code.svg';
import BookIcon from './img/book.svg';
import FileCodeIcon from './img/file-code.svg';
import GitHubIcon from './img/github.svg';
import DiscordIcon from './img/discord.svg';
// import FileCodeWithStarIcon from './img/file-code-with-star.svg';
import FileJavaScriptIcon from './img/file-javascript.svg';
import FilePythonIcon from './img/file-python.svg';
import CliIcon from './img/cli.svg';
import RectangleJavaScriptIcon from './img/rectangle-javascript.svg';
import RectanglePythonIcon from './img/rectangle-python.svg';
import CrawleeIcon from './img/crawlee.svg';

export default function Home() {
    return (
        <Layout
            description="Navigate the Apify documentation for insights into web scraping and web automation on the Apify platform. Learn best practices, and discover how to optimize your web scrapers."
        >
            <Hero
                heading="Apify Documentation"
                description={<p>
                    Learn how to extract value from the web with the Apify platform.
                </p>}
            />
            <Section heading="Academy">
                <div className={styles.cardsWrapper}>
                    <CardWithIcon
                        icon={<LearnIcon />}
                        title="Web scraping course"
                        description="A comprehensive and practical web scraping course that will take you from an absolute beginner to an expert scraper developer. It's free and uses only open-source tools."
                        to="/academy/web-scraping-for-beginners"
                        width="calc(50% - 12px)"
                    />
                    <CardWithIcon
                        icon={<BookCodeIcon />}
                        title="Apify platform course"
                        description="Master the Apify platform and become an expert Apify developer. You will learn how to deploy your code as an Apify Actor and effectively use all platform features."
                        to="/academy/apify-platform"
                        width="calc(50% - 12px)"
                    />
                </div>
            </Section>
            <Section heading="Documentation">
                <div className={styles.cardsWrapper}>
                    <CardWithIcon
                        icon={<BookIcon />}
                        title="Apify platform reference"
                        description="A full reference for the Apify platform, covering Actors, Proxies, Storage, integrations, and open-source tools."
                        to="/platform"
                        width="calc(50% - 12px)"
                    />
                    <CardWithIcon
                        icon={<FileCodeIcon />}
                        title="Apify API reference"
                        description="Get programmatic access to the Apify platform using a REST API."
                        to="/api/v2/"
                        width="calc(50% - 12px)"
                    />
                </div>
            </Section>
            <Section heading="Development kits">
                <div className={styles.cardsWrapper} style={{ marginBottom: '24px' }}>
                    <CardWithIcon
                        icon={<RectangleJavaScriptIcon />}
                        title="Apify SDK for JavaScript"
                        description="A toolkit for building actors on the Apify platform in JavaScript."
                        to="/sdk/js/"
                        width="calc(50% - 12px)"
                    />
                    <CardWithIcon
                        icon={<RectanglePythonIcon />}
                        title="Apify SDK for Python"
                        description="A toolkit for building actors on the Apify platform in Python."
                        to="/sdk/python/"
                        width="calc(50% - 12px)"
                    />
                    <CardWithIcon
                        icon={<FileJavaScriptIcon />}
                        title="Apify API client for JavaScript"
                        description="Integrate with the Apify platform from your Node.js and JavaScript applications."
                        to="/api/client/js/"
                        width="calc(50% - 12px)"
                    />
                    <CardWithIcon
                        icon={<FilePythonIcon />}
                        title="Apify API client for Python"
                        description="Integrate with the Apify platform from your Python applications."
                        to="/api/client/python/"
                        width="calc(50% - 12px)"
                    />
                    <CardWithIcon
                        icon={<CliIcon />}
                        title="Apify CLI"
                        description="Manage Actors and the Apify platform from your terminal or shell scripts."
                        to="/cli/"
                        width="calc(50% - 12px)"
                    />
                    <CardWithIcon
                        icon={<CrawleeIcon />}
                        title="Crawlee"
                        description="The most popular open-source library for web scraping and crawling in JavaScript/Node.js."
                        to="https://crawlee.dev"
                        width="calc(50% - 12px)"
                    />
                </div>
            </Section>
            <Section heading="Community">
                <div className={styles.cardsWrapper}>
                    <CardWithIcon
                        icon={<GitHubIcon />}
                        title="GitHub"
                        description="Check out and contribute to our open-source projects on GitHub."
                        to="https://github.com/apify"
                        width="calc(50% - 12px)"
                    />
                    <CardWithIcon
                        icon={<DiscordIcon />}
                        title="Discord"
                        description="Join our Discord community to get the latest news and connect with other Apify developers."
                        to="https://discord.com/invite/jyEM2PRvMU"
                        width="calc(50% - 12px)"
                    />
                    {/* <CardWithIcon
                        icon={<FileCodeWithStarIcon />}
                        title="Open source"
                        description="We ❤️ open source and contribute to it. See all our projects."
                        to="/learn"
                        width="calc(33.3% - 12px)"
                    /> */}
                </div>
            </Section>
            <Section heading="Change log">
                <ChangeLog />
            </Section>
        </Layout>
    );
}
