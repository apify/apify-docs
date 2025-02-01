import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';

import { isDifferentInstance } from '../../utils';

export default function MDXA(props) {
    const { siteConfig } = useDocusaurusContext();

    if (props.href?.startsWith(siteConfig.url)) {
        props = { ...props, target: '_self' };
    }

    // absolute links in README, e.g. in the SDK or API Client docs, need to be converted to local `to` links
    if (props.href?.startsWith(siteConfig.url) && isDifferentInstance(siteConfig.baseUrl)) {
        const { href, ...rest } = props;
        rest.to = props.href.replace(siteConfig.url + siteConfig.baseUrl, '/');
        props = rest;
    }

    // links to a different docusaurus instance cannot go through the client side navigation, we need a hard redirect
    if (props.href && isDifferentInstance(props.href)) {
        return <a {...props} onClick={((e) => {
            e.preventDefault();
            window.location.assign(props.href);
        })}>
            {props.children}
        </a>;
    }

    return <Link {...props} />;
}
