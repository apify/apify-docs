import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';

import { UiDependencyProvider } from '@apify/ui-library';

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
