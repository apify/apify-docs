// client module for callbacks on route change
// see https://docusaurus.io/docs/advanced/client#client-module-lifecycles
export function onRouteDidUpdate({ location, previousLocation }) {
    // Don't execute if we are still on the same page; the lifecycle may be fired
    // because the hash changes (e.g. when navigating between headings)
    if (location.pathname !== previousLocation?.pathname) {
        // hubspot tracking page view
        // eslint-disable-next-line no-underscore-dangle, no-multi-assign
        const _hsq = window._hsq = window._hsq || [];
        _hsq.push(['setPath', window.location.pathname]);
        _hsq.push(['trackPageView']);
    }
}
