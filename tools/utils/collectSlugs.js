const { execSync } = require('child_process');

function collectSlugs(pathname) {
    const a = execSync(`find ${pathname} -type f -name "*.md" -exec grep slug: {} \\;`, { encoding: 'utf-8' });
    return a.split('\n').filter((x) => x.startsWith('slug: ')).map((x) => x.replace('slug: ', ''));
}

module.exports = {
    collectSlugs,
};
