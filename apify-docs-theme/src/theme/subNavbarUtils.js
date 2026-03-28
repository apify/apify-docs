import { isRegexpStringMatch } from '@docusaurus/theme-common';
import { usePluginData } from '@docusaurus/useGlobalData';

/**
 * Returns the subNavbars array from theme options.
 * Handles both `subNavbars` (array) and legacy `subNavbar` (single object).
 */
export function useSubNavbars() {
    const { options } = usePluginData('@apify/docs-theme');
    return options.subNavbars || (options.subNavbar ? [options.subNavbar] : []);
}

/**
 * Returns the first sub-navbar whose pathRegex matches the given pathname,
 * or null if none match.
 */
export function getActiveSubNavbar(subNavbars, pathname) {
    if (!subNavbars?.length) return null;
    return subNavbars.find(
        (nav) => !nav.pathRegex || isRegexpStringMatch(nav.pathRegex, pathname),
    ) || null;
}
