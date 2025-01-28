import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React,
{
    useState,
    useEffect,
} from 'react';
import styled from 'styled-components';

import {
    ActorTemplateCard,
    theme,
} from '@apify-packages/ui-library';

interface ActorTemplate {
    id: string,
    name: string,
    label: string,
    description: string,
    category: string,
    technologies: string[],
    useCases: string[],
}

interface ActorTemplatesProps {
    numberOfDisplayedTemplates?: number,
    displayedTemplatesIds?: string[]
}

const ACTOR_TEMPLATES_GITHUB_URL = 'https://github.com/apify/actor-templates';
const ACTOR_TEMPLATES_GITHUB_MANIFEST_URL = 'https://raw.githubusercontent.com/apify/actor-templates/master/templates/manifest.json';
const NUMBER_OF_DISPLAYED_TEMPLATES_DEFAULT = 3;
const APIFY_WEBSITE_ICONS_RESOURCES_URL = 'https://apify.com/img/template-icons';

const ActorTemplatesWrapper = styled.div`
    display: grid;
    margin: 0 auto;
    gap: ${theme.space.space24};

    @media (min-width: ${theme.layout.tablet}) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width:${theme.layout.desktop}) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

export const ActorTemplates: React.FC<ActorTemplatesProps> = ({
    numberOfDisplayedTemplates = NUMBER_OF_DISPLAYED_TEMPLATES_DEFAULT,
    displayedTemplatesIds = [],
}) => {
    const { siteConfig } = useDocusaurusContext();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [actorTemplatesData, setActorTemplatesData] = useState([]);

    useEffect(() => {
        const fetchTemplates = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const response = await fetch(ACTOR_TEMPLATES_GITHUB_MANIFEST_URL);
                const { templates } = await response.json();

                setActorTemplatesData(templates
                    .filter((template) => displayedTemplatesIds.includes(template.id))
                    .slice(0, numberOfDisplayedTemplates)
                    .sort((a, b) => displayedTemplatesIds.indexOf(a.id) - displayedTemplatesIds.indexOf(b.id)),
                );
            } catch (error) {
                setIsError(true);

                console.error('Error while fetching actor templates', error);
            }
            setIsLoading(false);
        };

        void fetchTemplates();
    }, [displayedTemplatesIds, numberOfDisplayedTemplates]);

    if (isError) {
        return (
            <div>
                We&apos;re sorry, it wasn&apos;t possible to load Actor templates. <br />
                You can see them directly on <a href={ACTOR_TEMPLATES_GITHUB_URL} target="_blank" rel="noreferrer noopener">GitHub</a>.
            </div>
        );
    }

    if (isLoading) {
        return <div>Loading Actor templates ...</div>;
    }

    return <ActorTemplatesWrapper>
        {actorTemplatesData?.map((actorTemplate: ActorTemplate) => {
            const {
                id,
                label,
                description,
                category,
                technologies,
            } = actorTemplate;

            const iconsSources = [
                {
                    src: `${APIFY_WEBSITE_ICONS_RESOURCES_URL}/${category}.svg`,
                    alt: category,
                },
                ...(technologies || []).map((technology) => {
                    return {
                        src: `${APIFY_WEBSITE_ICONS_RESOURCES_URL}/${technology}.svg`,
                        alt: technology,
                    };
                }),
            ];

            return <Link key={id} to={new URL(`https://apify.com/templates/${id}`, siteConfig.url).href}>
                <ActorTemplateCard
                    id={id}
                    label={label}
                    description={description}
                    icons={iconsSources.map((icon) => <img key={icon.alt} src={icon.src} alt={icon.alt} />)}
                />
            </Link>;
        },
        )}
    </ActorTemplatesWrapper>;
};
