import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// Opt-in link trackers. Currently limited to Trust Center to avoid Segment noise - see https://github.com/apify/apify-docs/issues/2409.
const LINK_TRACKERS = [
    {
        test: (url) => url.hostname === 'trust.apify.com',
        element: 'trust-center-link',
    },
    // Examples for future opt-in:
    // { test: (url) => !/(^|\.)apify\.com$/.test(url.hostname) } // all outbound
    // { test: () => true }                                       // all links
];

let installed = false;

function handleLinkClick(event) {
    // auxclick fires for all non-primary buttons; only handle middle click (button === 1)
    if (event.type === 'auxclick' && event.button !== 1) return;
    if (process.env.NODE_ENV !== 'production' || !window.analytics) return;

    const anchor = event.target.closest('a[href]');
    if (!anchor) return;

    let url;
    try {
        url = new URL(anchor.getAttribute('href'), window.location.href);
    } catch {
        return;
    }
    if (!/^https?:$/.test(url.protocol)) return;

    const tracker = LINK_TRACKERS.find(({ test }) => test(url));
    if (!tracker) return;

    const isApifyDomain = /(^|\.)apify\.com$/.test(url.hostname);

    window.analytics.track('Clicked', {
        app: 'docs',
        element: tracker.element ?? 'link',
        button_text: anchor.textContent?.trim().slice(0, 200) || null,
        href: url.href,
        is_subdomain: isApifyDomain && url.hostname !== window.location.hostname,
        is_outbound: !isApifyDomain,
    });
}

function installLinkClickTracker() {
    if (installed) return;
    installed = true;

    document.addEventListener('click', handleLinkClick, { capture: true });
    document.addEventListener('auxclick', handleLinkClick, { capture: true });
}

export default ExecutionEnvironment.canUseDOM ? {
    onRouteDidUpdate() {
        installLinkClickTracker();
    },
} : null;
