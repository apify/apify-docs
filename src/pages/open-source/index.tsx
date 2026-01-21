import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';

import { Banner, Heading, Link, Text, theme } from '@apify/ui-library';

import ActionCard from '../../components/ActionCard/ActionCard';
import { ActorTemplates } from '../../components/ActorTemplates/ActorTemplates';
import Hero from '../../components/Hero/Hero';
import OpenSourceCards from '../../components/OpenSourceCards/OpenSourceCards';
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

    .openSourceCards {
        display: grid;
        gap: 2.4rem;

        @media ${theme.device.tablet} {
            grid-template-columns: repeat(2, 1fr);
        }

        @media ${theme.device.desktop} {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    .openSourceLink {
        margin-top: ${theme.space.space24};
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
                        description="Tools and libraries maintained by the Apify team."
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
                                        A popular library for building reliable web crawlers, scrapers, and browser automations.
                                    </Text>
                                </div>
                                <div className={clsx('bannerContentColumn', 'bannerContentActions')}>
                                    <ActionCard title="JavaScript" iconSrc={useBaseUrl('/img/javascript-40x40.svg')} to="https://crawlee.dev" />
                                    <ActionCard title="Python" iconSrc={useBaseUrl('/img/python-40x40.svg')} to="https://crawlee.dev/python/" />
                                </div>
                            </div>
                        </Banner>
                    </Section>
                    <Section heading="" headingAs="h2">
                        <div className="openSourceCards">
                            <OpenSourceCards hideCrawlee />
                        </div>
                        <Link to="https://github.com/apify" className="actionLink openSourceLink" hideExternalIcon>
                            Follow Apify on GitHub
                        </Link>
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
