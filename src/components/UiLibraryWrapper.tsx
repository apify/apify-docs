import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import React, { PropsWithChildren, useEffect, useState } from 'react';

import { UiDependencyProvider } from '@apify-packages/ui-library';

export default function UiLibraryWrapper({ children }: PropsWithChildren) {
    const [themeIsDark, setThemeIsDark] = useState(true);
    const isDark = useColorMode().isDarkTheme;
    useEffect(() => {
        setThemeIsDark(isDark);
    }, [isDark]);

    return (
        <UiDependencyProvider dependencies={{
            InternalLink: (props) => <Link {...props} />,
            windowLocationHost: useBaseUrl(''),
            isHrefTrusted: () => true,
            uiTheme: themeIsDark ? 'DARK' : 'LIGHT',
        }}>{children}</UiDependencyProvider>
    );
}
