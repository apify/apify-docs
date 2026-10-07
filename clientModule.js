// client module for callbacks on route change
// see https://docusaurus.io/docs/advanced/client#client-module-lifecycles
export function onRouteUpdate({ location }) {
    // The built-in list of all Academy tags is replaced by the hand-written tutorials landing page.
    // nginx redirects direct visits, but clicks on "View all tags" are handled in the browser.
    if (/^\/academy\/tags\/?$/.test(location.pathname)) {
        window.location.replace('/academy/tutorials');
    }
}

export function onRouteDidUpdate({ location, previousLocation }) {
    // Don't execute if we are still on the same page; the lifecycle may be fired
    // because the hash changes (e.g. when navigating between headings)
    if (location.pathname !== previousLocation?.pathname) {
        // hubspot tracking page view
        // eslint-disable-next-line no-underscore-dangle, no-multi-assign
        const _hsq = (window._hsq = window._hsq || []);
        _hsq.push(['setPath', window.location.pathname]);
        _hsq.push(['trackPageView']);
    }
}
