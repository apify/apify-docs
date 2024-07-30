import { theme, Banner, Heading, Text, Link } from '@apify-packages/ui-library';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';

import ActionCard from '../../components/ActionCard/ActionCard';
import { ActorTemplates } from '../../components/ActorTemplates/ActorTemplates';
import CardWithImageAndContent from '../../components/CardWithImageAndContent/ImageWithContent';
import GitButton from '../../components/GitButton';
import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import UiLibraryWrapper from '../../components/UiLibraryWrapper';
import Crawlee from '../img/crawlee.svg';

const StyledWrapper = styled.div`
    .banner {
        padding: ${theme.space.space40} ${theme.space.space16};

        @media ${theme.device.tablet} {
            padding: ${theme.space.space40} ${theme.space.space40};
        }

        @media ${theme.device.largeDesktop} {
            padding: ${theme.space.space40} ${theme.space.space80};
        }
    }

    .bannerContent {
        // grid with two columns
        display: flex;
        flex-direction: column;
        gap: ${theme.space.space24};
        @media ${theme.device.largeDesktop} {
            gap: 170px;
        }
        @media ${theme.device.tablet} {
            flex-direction: row;
        }
    }

    .bannerContentColumn {
        display: flex;
        flex-direction: column;
        gap: ${theme.space.space8};
    }

    .bannerContentActions {
        flex-shrink: 0;
        @media ${theme.device.tablet} {
            width: 384px;
        }
    }

    .bannerContentHeader {
        display: flex;
        align-items: center;
        gap: ${theme.space.space8};
    }

    .otherCards {
        display: flex;
        flex-direction: column;
        gap: ${theme.space.space40};

        .cardContentWrapper {
            padding-top: 0;
        }

        @media ${theme.device.tablet} {
            .cardContentWrapper {
                padding-top: ${theme.space.space16};
            }
            flex-direction: row;
            gap: ${theme.space.space24};
        }
        & > div {
            flex: 1;
        }
    }

    .otherCardsTitleLink {
        display: flex;
        gap: ${theme.space.space8};
        color: ${theme.color.neutral.text};
        &:hover {
            color: ${theme.color.primary.actionHover};
            h3 {
                color: ${theme.color.primary.actionHover};
            }
        }
    }

    .actorTemplates {
        display: flex;
        flex-direction: column;
        gap: ${theme.space.space24};
    }
`;

export default function OpenSource() {
    return (
        <Layout>
            <UiLibraryWrapper>
                <StyledWrapper>
                    <Hero
                        heading="Apify open source"
                        description="Open-source tools and libraries created and maintained by Apify experts to help you with web scraping, browser automation, and proxy management."
                    />
                    <Section>
                        <Banner useGradientBackground={false} className="banner">
                            <div className="bannerContent">
                                <div className="bannerContentColumn">
                                    <div className="bannerContentHeader">
                                        <Crawlee width={24} height={24} />
                                        <Heading type="title2xl" as="h2">
                                            Crawlee
                                        </Heading>
                                    </div>
                                    <Text size="big" color={theme.color.neutral.textMuted}>
                                        Crawlee is a fully open-source web scraping and browser automation library that helps you build reliable crawlers.
                                    </Text>
                                </div>
                                <div className={clsx('bannerContentColumn', 'bannerContentActions')}>
                                    <ActionCard title="JavaScript" iconSrc={useBaseUrl('/img/javascript-40x40.svg')} to="https://crawlee.dev" />
                                    <ActionCard title="Python" iconSrc={useBaseUrl('/img/python-40x40.svg')} to="https://crawlee.dev/python/" />
                                </div>
                            </div>
                        </Banner>
                    </Section>
                    <Section heading="Other" headingAs="h2">
                        <div className="otherCards">
                            <CardWithImageAndContent
                                content={
                                    <div className="cardContentWrapper">
                                        <div className="cardContentWrapperText">
                                            <Link to="https://github.com/apify/fingerprint-suite" className="otherCardsTitleLink">
                                                <img width={24} src={useBaseUrl('/img/fingerprint-suite.svg')} />
                                                <Heading type="titleXl" as="h3">
                                                    Fingerprint suite
                                                </Heading>
                                            </Link>
                                            <Text color={theme.color.neutral.textMuted} size="big">
                                                Generate and inject browser fingerprints to avoid detection and improve scraper stealth.
                                            </Text>
                                        </div>
                                        <div>
                                            <GitButton
                                                href="https://github.com/apify/fingerprint-suite"
                                                data-size="large"
                                                data-show-count="true"
                                                aria-label="Star apify/crawlee on GitHub"
                                            >
                                                Star
                                            </GitButton>
                                        </div>
                                    </div>
                                }
                            />
                            <CardWithImageAndContent
                                content={
                                    <div className="cardContentWrapper">
                                        <div className="cardContentWrapperText">
                                            <Link to="https://github.com/apify/got-scraping" className="otherCardsTitleLink">
                                                <img width={24} src={useBaseUrl('/img/got-scraping.svg')} />
                                                <Heading type="titleXl" as="h3">
                                                    Got scraping
                                                </Heading>
                                            </Link>
                                            <Text color={theme.color.neutral.textMuted} size="big">
                                                A powerful extension for sending browser-like requests and blending in with web traffic.
                                            </Text>
                                        </div>
                                        <div>
                                            <GitButton
                                                href="https://github.com/apify/got-scraping"
                                                data-size="large"
                                                data-show-count="true"
                                                aria-label="Star apify/crawlee on GitHub"
                                            >
                                                Star
                                            </GitButton>
                                        </div>
                                    </div>
                                }
                            />
                            <CardWithImageAndContent
                                content={
                                    <div className="cardContentWrapper">
                                        <div className="cardContentWrapperText">
                                            <Link to="https://github.com/apify/proxy-chain" className="otherCardsTitleLink">
                                                <Heading type="titleXl" as="h3">
                                                    Proxy chain
                                                </Heading>
                                            </Link>
                                            <Text color={theme.color.neutral.textMuted} size="big">
                                                A Node.js proxy server with support for SSL, authentication, upstream proxy chaining, custom HTTP responses, and
                                                traffic statistics.
                                            </Text>
                                        </div>
                                        <div>
                                            <GitButton
                                                href="https://github.com/apify/proxy-chain"
                                                data-size="large"
                                                data-show-count="true"
                                                aria-label="Star apify/crawlee on GitHub"
                                            >
                                                Star
                                            </GitButton>
                                        </div>
                                    </div>
                                }
                            />
                        </div>
                    </Section>
                    <Section
                        heading="Actor templates"
                        description="Actor templates help you quickly set up your web scraping projects.
                            Save development time and get immediate access to all the features of the Apify platform."
                        headingAs="h2"
                    >
                        <div className="actorTemplates">
                            <ActorTemplates displayedTemplatesIds={['python-start', 'js-start', 'ts-start']} />
                            <Link to="https://apify.com/templates" className="actionLink" hideExternalIcon>
                                Browse all templates
                            </Link>
                        </div>
                    </Section>
                </StyledWrapper>
            </UiLibraryWrapper>
        </Layout>
    );
}
