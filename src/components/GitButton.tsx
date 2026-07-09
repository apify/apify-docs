import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { theme } from '@apify/ui-library';

type GitButtonProps = {
    href: string;
    ariaLabel: string;
};

const GIT_BUTTON_CLASSNAMES = {
    LABEL: 'GitButton__label',
    COUNT: 'GitButton__count',
} as const;

// Deduplicates star-count fetches per repo within a session. Unauthenticated GitHub API
// allows 60 req/hr per visitor IP - plenty for a handful of buttons, and on failure the
// count is simply not shown.
const starCache = new Map<string, Promise<number | null>>();

function fetchStars(repo: string): Promise<number | null> {
    if (!starCache.has(repo)) {
        starCache.set(repo, fetch(`https://api.github.com/repos/${repo}`)
            .then(async (response) => (response.ok ? response.json() : null))
            .then((data) => (typeof data?.stargazers_count === 'number' ? data.stargazers_count : null))
            .catch(() => null));
    }
    return starCache.get(repo)!;
}

const GitHubMarkIcon = () => (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" fill="currentColor" style={{ flexShrink: 0 }}>
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
);

const StyledGitButton = styled.a`
    display: inline-flex;
    align-items: stretch;
    /* page-level rules (e.g. .Description a { display: flex }) can stretch the anchor */
    width: fit-content;
    height: 30px;
    border: 1px solid ${theme.color.neutral.border};
    border-radius: ${theme.radius.radius6};
    background-color: ${theme.color.neutral.cardBackground};
    color: ${theme.color.neutral.text};
    ${theme.typography.shared.desktop.bodyMStrong}
    overflow: hidden;
    transition: background-color ${theme.transition.fastEaseOut};

    &:hover {
        text-decoration: none;
        color: ${theme.color.neutral.text};
        background-color: ${theme.color.neutral.hover};
    }

    .${GIT_BUTTON_CLASSNAMES.LABEL} {
        display: inline-flex;
        align-items: center;
        gap: ${theme.space.space8};
        padding: 0 ${theme.space.space12};
    }

    .${GIT_BUTTON_CLASSNAMES.COUNT} {
        display: inline-flex;
        align-items: center;
        padding: 0 ${theme.space.space12};
        border-left: 1px solid ${theme.color.neutral.border};
    }
`;

// Self-rendered instead of GitHub's `buttons.github.io` iframe, which proved unreliable
// (rendered as a white box on dark backgrounds) and had a fixed width that never matched
// the actual button size. Same approach as `CrawleeLearnMore` in apify-web.
const GitButton = ({ href, ariaLabel }: GitButtonProps) => {
    const [stars, setStars] = useState<number | null>(null);
    const repo = new URL(href).pathname.replace(/^\/|\/$/g, '');

    useEffect(() => {
        let cancelled = false;
        void fetchStars(repo).then((count) => {
            if (!cancelled) setStars(count);
        });
        return () => {
            cancelled = true;
        };
    }, [repo]);

    return (
        <StyledGitButton href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
            <span className={GIT_BUTTON_CLASSNAMES.LABEL}>
                <GitHubMarkIcon />
                Star
            </span>
            {stars !== null && <span className={GIT_BUTTON_CLASSNAMES.COUNT}>{stars.toLocaleString('en-US')}</span>}
        </StyledGitButton>
    );
};

export default GitButton;
