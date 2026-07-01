import BrowserOnly from '@docusaurus/BrowserOnly';
import { useColorMode } from '@docusaurus/theme-common';

interface GitButtonProps {
    href: string;
    ariaLabel: string;
}

function GitButtonInner({ href, ariaLabel }: GitButtonProps) {
    const { colorMode } = useColorMode();
    // unauthenticated GitHub API requests (60/hr) can throttle star counts — replace iframe with a direct GitHub API call + server-side token to fix
    const src = `https://buttons.github.io/buttons.html#${new URLSearchParams({
        href,
        'data-icon': 'octicon-mark-github',
        'data-text': 'Star',
        'data-size': 'large',
        'data-show-count': 'true',
        'data-color-scheme': colorMode,
        'aria-label': ariaLabel,
    }).toString()}`;

    return (
        <iframe
            key={colorMode}
            src={src}
            scrolling="no"
            width={170}
            height={30}
            title="GitHub"
            style={{ position: 'relative', colorScheme: 'normal' }}
        />
    );
}

export default function GitButton(props: GitButtonProps) {
    return <BrowserOnly>{() => <GitButtonInner {...props} />}</BrowserOnly>;
}
