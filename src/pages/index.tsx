/* eslint-disable max-len */
import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

import { Banner, theme } from '@apify-packages/ui-components';

import { styled } from 'styled-components';
import { Heading } from '../components/Heading';
import { Text } from '../components/Text';
import styles from './index.module.css';
import Hero from '../components/Hero/Hero';
import Section from '../components/Section/Section';
import CardWithIcon from '../components/CardWithIcon/CardWithIcon';
import ActionCard from '../components/ActionCard/ActionCard';
import PlainCard from '../components/PlainCard/PlainCard';
import { ActorTemplates } from '../components/ActorTemplates/ActorTemplates';
import CardWithImageAndContent from '../components/CardWithImageAndContent/ImageWithContent';
import OpenSourceCards from '../components/OpenSourceCards/OpenSourceCards';
import Button from '../components/Button';

/* Platform icons */
import Actors from './img/platform_icons/actors.svg';
import Storage from './img/platform_icons/storage.svg';
import Proxy from './img/platform_icons/proxy.svg';
import Schedules from './img/platform_icons/schedules.svg';
import Integrations from './img/platform_icons/integrations.svg';
import Monitoring from './img/platform_icons/monitoring.svg';
import Collaboration from './img/platform_icons/collaboration.svg';
import Security from './img/platform_icons/security.svg';

/* Academy images */
import WebScrapingForBeginners from './img/academy_icons/web_scraping_for_beginners.svg';
import ApifyPlatformCourse from './img/academy_icons/apify_platform_course.svg';
import ApiScraping from './img/academy_icons/api_scraping.svg';
import AntiScrapingProtections from './img/academy_icons/anti_scraping_protections.svg';
import ExpertScrapingWithApify from './img/academy_icons/expert_scraping_with_apify.svg';
import DeployYourCode from './img/academy_icons/deploy_your_code.svg';

const StyledBanner = styled(Banner)`
    width: 100%;
    padding: 40px 16px 24px 16px;

    @media (min-width: ${theme.layout.tablet}) {
        width: 738px;
        padding: 40px;
    }

    @media (min-width: ${theme.layout.desktop}) {
        width: 896px;
    }

    @media (min-width: ${theme.layout.largeDesktop}) {
        width: 1200px;
    }
`;

export default function Home() {
    return (
        <Layout>
            <Hero
                heading="Documentation"
                description={
                    <Text color={theme.color.neutral.textMuted} size='large'>
                Mold our tools any way you want to scrape websites or automate
                repetitive tasks.
                        <br />
                Find the solution to your task here or use the search box above.
                    </Text>
                }
            />
            <Section>
                <StyledBanner useGradientBackground={false}>
                    <div className={styles.bannerContent}>
                        <div className={styles.bannerContentDescription}>
                            <Heading type="titleXl">Getting started</Heading>
                            <Text size='medium' color={theme.color.neutral.textMuted}>
                                Learn what an Actor is, how to turn your program into an Actor, and how to deploy it.
                            </Text>
                            <ThemedImage
                                className={styles.bannerContentImage}
                                sources={{
                                    light: useBaseUrl('/img/landing-pages/platform_service.svg'),
                                    dark: useBaseUrl('/img/landing-pages//platform_service_dark.svg'),
                                }}
                                alt="Actors on the Apify platform"
                            />
                        </div>
                        <div className={styles.bannerContentActions}>
                            <ActionCard
                                title="What is an Actor"
                                to="/platform/actors"
                            />
                            <ActionCard
                                title="Run Actor from Apify Store"
                                to="/platform/actors/running"
                            />
                            <ActionCard
                                title="Develop your own Actor"
                                to="/platform/actors/development"
                            />
                            <ActionCard
                                title="Publish and monetize your Actor"
                                to="/platform/actors/publishing"
                            />
                        </div>
                        <ThemedImage
                            className={styles.bannerContentImageAfter}
                            sources={{
                                light: useBaseUrl('/img/landing-pages/platform_service.svg'),
                                dark: useBaseUrl('/img/landing-pages//platform_service_dark.svg'),
                            }}
                            alt="Actors on the Apify platform"
                        />
                    </div>

                </StyledBanner>
            </Section>
            <Section
                heading="Platform"
                description="Let us guide your first steps on the Apify platform."
            >
                <div className={styles.sectionLayoutWrapper}>
                    <div className={styles.cards}>
                        <CardWithIcon
                            icon={<Actors />}
                            title="Actors"
                            description="Learn how to develop, run and share your own web scraping and automation tools."
                            to="/platform/actors"
                        />
                        <CardWithIcon
                            icon={<Storage />}
                            title="Storage"
                            description="Store anything from images and key-value pairs to structured output data."
                            to="/platform/storage"
                        />
                        <CardWithIcon
                            icon={<Proxy />}
                            title="Proxy"
                            description="Learn to anonymously and reliably access websites in scraping/automation jobs."
                            to="/platform/proxy"
                        />
                        <CardWithIcon
                            icon={<Schedules />}
                            title="Schedules"
                            description="Learn how to automatically start your Actor and task runs."
                            to="/platform/schedules"
                        />
                        <CardWithIcon
                            icon={<Integrations />}
                            title="Integrations"
                            description="Learn how to connect the Apify platform with your projects."
                            to="/platform/integrations"
                        />
                        <CardWithIcon
                            icon={<Monitoring />}
                            title="Monitoring"
                            description="Check the performance of your Actors, validate your data, and receive alerts."
                            to="/platform/monitoring"
                        />
                        <CardWithIcon
                            icon={<Collaboration />}
                            title="Collaboration"
                            description="Collaborate with other users and manage permissions."
                            to="/platform/collaboration"
                        />
                        <CardWithIcon
                            icon={<Security />}
                            title="Security"
                            description="Apify's security practices and data protection measures."
                            to="/platform/security"
                        />
                    </div>
                </div>
            </Section>
            <Section>
                <div className={styles.cards}>
                    <CardWithImageAndContent
                        image={
                            <ThemedImage
                                sources={{
                                    light: useBaseUrl('/img/landing-pages/sdk.svg'),
                                    dark: useBaseUrl('/img/landing-pages/sdk_dark.svg'),
                                }}
                                alt="Apify SDK"
                            />
                        }
                        content={
                            <div className={styles.cardContentWrapper}>
                                <Heading type='titleXl' as="h3">SDK</Heading>
                                <Text color={theme.color.neutral.textMuted}>
                                    Toolkit for building Actors on Apify platform. Transfer crawler into an Actor.
                                </Text>
                                <Text>
                                    <ul className={styles.cardContentList}>
                                        <li><Link to="/sdk">SDK for Python</Link></li>
                                        <li><Link to="/sdk-js">SDK for JavaScript</Link></li>
                                    </ul>
                                </Text>
                            </div>
                        }
                    />
                    <CardWithImageAndContent
                        image={
                            <ThemedImage
                                sources={{
                                    light: useBaseUrl('/img/landing-pages/api.svg'),
                                    dark: useBaseUrl('/img/landing-pages/api_dark.svg'),
                                }}
                                alt="Apify API"
                            />
                        }
                        content={
                            <div className={styles.cardContentWrapper}>
                                <Heading type='titleXl' as="h3">API</Heading>
                                <Text color={theme.color.neutral.textMuted}>
                                    Use API to integrate Apify Actors with your applications.
                                </Text>
                                <Text>
                                    <ul className={styles.cardContentList}>
                                        <li><Link to="/sdk">Reference</Link></li>
                                        <li><Link to="/sdk-js">API client for Python</Link></li>
                                        <li><Link to="/sdk-js">API client for JavaScript</Link></li>
                                    </ul>
                                </Text>
                            </div>
                        }
                    />
                    <CardWithImageAndContent
                        image={
                            <ThemedImage
                                sources={{
                                    light: useBaseUrl('/img/landing-pages/cli.svg'),
                                    dark: useBaseUrl('/img/landing-pages/cli_dark.svg'),
                                }}
                                alt="Apify CLI"
                            />
                        }
                        content={
                            <div className={styles.cardContentWrapper}>
                                <Heading type='titleXl' as="h3">CLI</Heading>
                                <Text color={theme.color.neutral.textMuted}>
                                    Create, develop, build, and run Apify Actors from your terminal.
                                </Text>
                                <Text>
                                    <ul className={styles.cardContentList}>
                                        <li><Link to="/sdk">CLI reference</Link></li>
                                    </ul>
                                </Text>
                            </div>
                        }
                    />
                </div>
            </Section>
            <Section
                heading="Academy"
                description='Our free courses provide a detailed walkthrough of web scraping and automation, which will help turn you into an expert scraper developer.'
            >
                <div className={styles.sectionLayoutWrapper}>
                    <div className={styles.cards}>
                        <CardWithIcon
                            icon={<WebScrapingForBeginners />}
                            title="Web scraping for beginners"
                            description="Develop web scrapers with this comprehensive and practical course."
                            to="/academy/web-scraping-for-beginners"
                        />
                        <CardWithIcon
                            icon={<ApifyPlatformCourse />}
                            title="Apify platform course"
                            description="Various different specific topics related to web-scraping and web-automation."
                            to="/academy/apify-platform"
                        />
                        <CardWithIcon
                            icon={<ApiScraping />}
                            title="API scraping"
                            description="Learn how professionals scrape various types of APIs."
                            to="/academy/api-scraping"
                        />
                        <CardWithIcon
                            icon={<AntiScrapingProtections />}
                            title="Anti-scraping protections"
                            description="Understand the various anti-scraping measures different sites."
                            to="/academy/anti-scraping"
                        />
                        <CardWithIcon
                            icon={<ExpertScrapingWithApify />}
                            title="Expert scraping with Apify"
                            description="Learn to develop pro-level scrapers on the Apify platform."
                            to="/academy/advanced-web-scraping"
                        />
                        <CardWithIcon
                            icon={<DeployYourCode />}
                            title="Deploy your code"
                            description="Take an existing project of yours and deploy it to the Apify platform."
                            to="/academy/deploying-your-code"
                        />
                    </div>
                    <Link to='/academy' className="actionLink">Visit Apify Academy</Link>
                </div>
            </Section>
            <Section heading='Our open-source projects'>
                <div className={styles.sectionLayoutWrapper}>
                    <div className={styles.cards}>
                        <OpenSourceCards />
                    </div>
                    <Link to='/academy' className="actionLink">View Apify on GitHub</Link>
                </div>
            </Section>
            <Section
                heading="Actor templates"
                description="Actor templates help you quickly set up your web scraping projects, saving you development time and giving you immediate access to all the features the Apify platform has to offer."
            >
                <div className={styles.sectionLayoutWrapper}>
                    <ActorTemplates displayedTemplatesIds={['js-start', 'ts-start', 'python-start']} />
                    <Link to='https://apify.com/templates' className="actionLink">Browse all templates</Link>
                </div>
            </Section>
            <Section heading="Community & Help">
                <div className={styles.actionCards}>
                    <PlainCard
                        icon={<ThemedImage
                            sources={{
                                light: useBaseUrl('/img/landing-pages/discord.svg'),
                                dark: useBaseUrl('/img/landing-pages/discord_dark.svg'),
                            }}
                            alt="Discord logo"
                        />}
                        title="Discord"
                        description="Join the conversation with other developers and connect with the community."
                        to="https://discord.com/invite/jyEM2PRvMU"
                    />
                    <PlainCard
                        icon={<ThemedImage
                            sources={{
                                light: useBaseUrl('/img/landing-pages/intercom.svg'),
                                dark: useBaseUrl('/img/landing-pages/intercom_dark.svg'),
                            }}
                            alt="Intercom logo"
                        />}
                        title="Help & Support"
                        description="Find answers to your questions and get help from our support team."
                        to="https://help.apify.com/"
                    />
                </div>
            </Section>
            <Section heading="Keep up with us!">
                <div className={styles.actionCards}>
                    <ActionCard
                        title="Blog"
                        titleAs='h4'
                        description="Updates, tips and stories from the world of web scraping."
                        to="https://blog.apify.com/"
                    />
                    <ActionCard
                        title="Changelog"
                        titleAs='h4'
                        description="What's new at Apify? Our latest feature and product updates."
                        to="https://apify.com/change-log"
                    />
                </div>
            </Section>
            <Section>
                <StyledBanner>
                    <div className={styles.smallBannerContent}>
                        <div className={styles.smallBannerContentText}>
                            <Heading type='titleXl'>Monetize your code</Heading>
                            <Text color={theme.color.neutral.textMuted}>
                                Publish your web scrapers as paid Actors on the Apify platform and get regular passive income!
                            </Text>
                        </div>
                        <Button>
                            Start building
                        </Button>
                    </div>
                </StyledBanner>
            </Section>
        </Layout>
    );
}
