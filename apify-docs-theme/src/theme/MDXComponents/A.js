import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import { isDifferentInstance } from '../../utils';

export default function MDXA(props) {
    const { siteConfig } = useDocusaurusContext();

    if (props.href?.startsWith(siteConfig.url) && isDifferentInstance(siteConfig.baseUrl)) {
        const { href, ...rest } = props;
        rest.to = props.href.replace(siteConfig.url + siteConfig.baseUrl, '/');
        props = rest;
    }

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
