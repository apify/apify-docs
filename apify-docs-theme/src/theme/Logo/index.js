import Link from '@docusaurus/Link';
import { useThemeConfig } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ThemedImage from '@theme/ThemedImage';
import React from 'react';

function LogoThemedImage({ logo, alt, imageClassName }) {
    const sources = {
        light: useBaseUrl(logo.src),
        dark: useBaseUrl(logo.srcDark || logo.src),
    };
    const themedImage = (
        <ThemedImage
            className={logo.className}
            sources={sources}
            height={logo.height}
            width={logo.width}
            alt={alt}
            style={logo.style}
        />
    );
    // Is this extra div really necessary?
    // introduced in https://github.com/facebook/docusaurus/pull/5666
    return imageClassName ? (
        <div className={imageClassName}>{themedImage}</div>
    ) : (
        themedImage
    );
}
export default function Logo(props) {
    const {
        siteConfig: { title, url: siteUrl, baseUrl: baseUrlConfig },
    } = useDocusaurusContext();
    const {
        navbar: { title: navbarTitle, logo },
    } = useThemeConfig();
    const { imageClassName, titleClassName, ...propsRest } = props;
    const logoLink = useBaseUrl(logo?.href || '/');
    const homeLink = useBaseUrl('/');

    // When the logo href points to the site's own URL (e.g. https://docs.apify.com
    // on the docs.apify.com site), use client-side routing instead of a full page
    // navigation. This avoids redirect issues when the site is served behind a
    // reverse proxy (nginx -> GitHub Pages) where the upstream URL can leak through.
    const siteOrigin = siteUrl?.replace(/\/$/, '');
    const isOwnSiteUrl = logo?.href && siteOrigin
        && (logo.href === siteOrigin || logo.href === `${siteOrigin}/`)
        && baseUrlConfig === '/';

    const resolvedLink = isOwnSiteUrl ? homeLink : logoLink;
    const isExternalLink = !isOwnSiteUrl && /^https?:\/\//.test(resolvedLink);

    // If visible title is shown, fallback alt text should be
    // an empty string to mark the logo as decorative.
    const fallbackAlt = navbarTitle ? '' : title;
    // Use logo alt text if provided (including empty string),
    // and provide a sensible fallback otherwise.
    const alt = logo?.alt ?? fallbackAlt;
    return (
        <Link
            {...(isExternalLink ? { href: resolvedLink } : { to: resolvedLink })}
            {...propsRest}
            {...(logo?.target && { target: logo.target })}>
            {logo && (
                <LogoThemedImage
                    logo={logo}
                    alt={alt}
                    imageClassName={imageClassName}
                />
            )}
            {!logo ? <b className={titleClassName}>{navbarTitle}</b> : null}
        </Link>
    );
}
