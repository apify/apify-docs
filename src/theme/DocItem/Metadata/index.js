import { PageMetadata } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/theme-common/internal';
import React from 'react';

export default function DocItemMetadata() {
    const { metadata, frontMatter, assets } = useDoc();
    let { title } = metadata;
    const section = metadata.source.match(/@site\/sources\/(.*?)\//)?.[1];
    const sections = {
        academy: 'Academy',
        platform: 'Platform',
    };

    if (section && sections[section]) {
        title = `${metadata.title} | ${sections[section]}`;
    }

    return (
        <PageMetadata
            title={title}
            description={metadata.description}
            keywords={frontMatter.keywords}
            image={assets.image ?? frontMatter.image}
        />
    );
}
