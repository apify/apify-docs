import isInternalUrl from '@docusaurus/isInternalUrl';
import Link from '@docusaurus/Link';
import { findFirstSidebarItemLink, useDocById } from '@docusaurus/plugin-content-docs/client';
import { usePluralForm } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import React from 'react';

import styles from './styles.module.css';

function useCategoryItemsPlural() {
    const { selectMessage } = usePluralForm();
    return (count) => selectMessage(
        count,
        translate(
            {
                message: '1 item|{count} items',
                id: 'theme.docs.DocCard.categoryDescription.plurals',
                description:
                        'The default description for a category card in the generated index about how many items this category includes',
            },
            { count },
        ),
    );
}

function CardContainer({ href, children }) {
    return (
        <Link
            href={href}
            className={clsx('card padding--lg', styles.cardContainer)}>
            {children}
        </Link>
    );
}

function CardLayout({ href, icon, title, description }) {
    return (
        <CardContainer
            href={href}>
            <Heading
                as="h2"
                className={clsx('text--truncate', styles.cardTitle)}
                title={title}>
                {icon} {title}
            </Heading>
            {description && (
                <p
                    className={clsx('text--truncate', styles.cardDescription)}
                    title={description}>
                    {description}
                </p>
            )}
        </CardContainer>
    );
}

function ApiCardLayout({ href, icon, title, className, endpoint }) {
    return (
        <CardContainer
            href={href}>
            <Heading
                as="h2"
                className={clsx('text--truncate', styles.cardTitle, className)}
                title={title}>
                {icon} {title}
            </Heading>
            <code className={clsx('text--truncate', styles.cardDescription)}>
                {endpoint}
            </code>
        </CardContainer>
    );
}

function CardCategory({ item }) {
    const href = findFirstSidebarItemLink(item);
    const categoryItemsPlural = useCategoryItemsPlural();
    // Unexpected: categories that don't have a link have been filtered upfront
    if (!href) {
        return null;
    }
    return (
        <CardLayout
            href={href}
            icon="🗃️"
            title={item.label}
            description={item.description ?? categoryItemsPlural(item.items.length)}
        />
    );
}

function CardLink({ item }) {
    const doc = useDocById(item.docId ?? undefined);

    if (item.href.startsWith('/api/v2')) {
        return (
            <ApiCardLayout
                href={item.href}
                title={item.label}
                className={clsx('openapi-endpoint', item.className)}
                endpoint={item.customProps.endpoint}
                method={item.customProps.method}
            />
        );
    }

    const icon = isInternalUrl(item.href) ? '📄️' : '🔗';
    return (
        <CardLayout
            href={item.href}
            icon={icon}
            title={item.label}
            description={item.description ?? doc?.description}
        />
    );
}

export default function DocCard({ item }) {
    switch (item.type) {
        case 'link':
            return <CardLink item={item}/>;
        case 'category':
            return <CardCategory item={item}/>;
        default:
            throw new Error(`unknown item type ${JSON.stringify(item)}`);
    }
}
