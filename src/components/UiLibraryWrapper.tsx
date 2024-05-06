import { UiDependencyProvider } from '@apify-packages/ui-library';
import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import React, { PropsWithChildren } from 'react';

export default function UiLibraryWrapper({ children }: PropsWithChildren) {
    return (
        <UiDependencyProvider dependencies={{
            InternalLink: (props) => <Link {...props} />,
            windowLocationHost: useBaseUrl(''),
            isHrefTrusted: () => true,
            uiTheme: useColorMode().isDarkTheme ? 'DARK' : 'LIGHT',
        }}>{children}</UiDependencyProvider>
    );
}
