import React from 'react';
import Link from '@docusaurus/Link';
import { isDifferentInstance } from '../../utils';

export default function MDXA(props) {
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
