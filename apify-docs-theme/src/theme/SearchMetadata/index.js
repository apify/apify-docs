import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useThemeConfig } from '@docusaurus/theme-common';

export default function SearchMetadata({ locale, version, tag }) {
    const { siteConfig } = useDocusaurusContext();
    const language = locale;

    // keep the tag on same value for all the content, and add a new section + section tag
    const section = siteConfig.projectName;
    const sectionTag = tag;
    const { versions } = useThemeConfig();

    // normalize the latest version regardless of what number it has,
    // so we can search across all "latest versions of the docs"
    if (!version || !versions || version === versions[0]) {
        version = 'latest';
    }

    tag = `default-${version}`;

    return (
        <Head>
            {/*
        Docusaurus metadata, used by third-party search plugin
        See https://github.com/cmfcmf/docusaurus-search-local/issues/99
        */}
            {locale && <meta name="docusaurus_locale" content={locale}/>}
            {version && <meta name="docusaurus_version" content={version}/>}
            {tag && <meta name="docusaurus_tag" content={tag}/>}

            {/* Algolia DocSearch metadata */}
            {language && <meta name="docsearch:language" content={language}/>}
            {version && <meta name="docsearch:version" content={version}/>}
            <meta name="docsearch:docusaurus_tag" content={tag}/>
            <meta name="docsearch:section" content={section}/>
            <meta name="docsearch:section_tag" content={sectionTag}/>
        </Head>
    );
}
