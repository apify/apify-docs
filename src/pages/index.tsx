import React from 'react';
import Layout from '@theme/Layout';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
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

export default function Home() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={`${siteConfig.title} · ${siteConfig.tagline}`}
            description={siteConfig.tagline}
        >
            <Hero
                heading="Apify Documentation"
                description={<p>
                Mold our tools any way you want to scrape websites or automate
                repetitive tasks.
                    <br />
                Find the solution to your task here or use the search box above.
                </p>}
            />
            <Section heading="Academy">
                <div className={styles.cardsWrapper}>
                    <CardWithIcon
                        icon={<LearnIcon />}
                        title="Web scraping course"
                        description="This course is a comprehensive and practical web scraping course that will take you from an absolute beginner to an expert scraper developer. It's free and uses only open-source tools."
                        to="/academy/web-scraping-for-beginners"
                        width="calc(50% - 12px)"
                    />
                    <CardWithIcon
                        icon={<BookCodeIcon />}
                        title="Apify Platform course"
                        description="Our Apify platform course will teach you how to master the Apify platform and become a professional Apify developer. You will learn how to deploy your code as an Apify actor and effectively use all the platform's features."
                        to="/academy/apify-platform"
                        width="calc(50% - 12px)"
                    />
                </div>
            </Section>
            <Section heading="Documentation">
                <div className={styles.cardsWrapper}>
                    <CardWithIcon
                        icon={<BookIcon />}
                        title="Platform docs"
                        description="Our documentation will help you master our tools to scrape websites or automate repetitive tasks."
                        to="/platform"
                        width="calc(50% - 12px)"
                    />
                    <CardWithIcon
                        icon={<FileCodeIcon />}
                        title="API reference"
                        description="Get programmatic access to the Apify Platform with the Apify API."
                        to="/api/v2/"
                        width="calc(50% - 12px)"
                    />
                </div>
            </Section>
            <Section heading="Build on Apify">
                <div className={styles.cardsWrapper} style={{ marginBottom: "24px" }}>
                    <CardWithIcon
                        icon={<RectangleJavaScriptIcon />}
                        title="SDK for JavaScript"
                        description="A toolkit for building actors on Apify Platform in JavaScript"
                        to="/sdk/js/"
                        width="calc(50% - 12px)"
                    />
                    <CardWithIcon
                        icon={<RectanglePythonIcon />}
                        title="SDK for Python (beta)"
                        description="A toolkit for building actors on Apify Platform in Python"
                        to="/sdk/python/"
                        width="calc(50% - 12px)"
                    />
                    <CardWithIcon
                        icon={<FileJavaScriptIcon />}
                        title="API Client for JavaScript"
                        description="The official library to access the Apify API from your JavaScript applications."
                        to="/api/client/js/"
                        width="calc(50% - 12px)"
                    />
                    <CardWithIcon
                        icon={<FilePythonIcon />}
                        title="API Client for Python"
                        description="The official library to access the Apify API from your Python applications."
                        to="/api/client/python/"
                        width="calc(50% - 12px)"
                    />
                    <CardWithIcon
                      icon={<CliIcon />}
                      title="Apify CLI"
                      description="Create actors from your computer's CLI. Run them locally or deploy them to the Apify platform."
                      to="/cli/"
                      width="calc(50% - 12px)"
                    />
                </div>
            </Section>
            <Section heading="Contribute">
                <div className={styles.cardsWrapper}>
                    <CardWithIcon
                        icon={<GitHubIcon />}
                        title="GitHub"
                        description="Check out our repositories on GitHub, or contribute to a project through forking."
                        to="https://github.com/apify"
                        width="calc(50% - 12px)"
                    />
                    <CardWithIcon
                        icon={<DiscordIcon />}
                        title="Discord"
                        description="Join our Discord community to get the latest news and find plenty of people happy to help you."
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
