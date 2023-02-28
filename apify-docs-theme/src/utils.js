/**
 * @param {string} input
 */
export function isDifferentInstance(input) {
    const simplified = input.startsWith('/') ? input.slice(1) : input;

    const instanceUrls = [
        'api/client',
        'sdk',
        'cli',
    ];

    return instanceUrls.some((url) => simplified.startsWith(url));
}
