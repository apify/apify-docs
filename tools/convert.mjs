import { dirname, parse, relative, resolve } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import { globby } from 'globby';
import { request } from 'undici';

const rootPath = dirname(fileURLToPath(import.meta.url)) + '/../';
const sources = ['academy', 'platform'];
const links = {};
const redirects = [];

function pathToSlug(path) {
    if (path.trim().endsWith('index')) {
        return '/';
    } else {
        return '/' + path.replace('- ', '').trim();
    }
}

async function transformFrontmatter(lines, paths, output) {
    let line;

    if ((line = lines.findIndex(l => l.match(/menuWeight: \d+/i))) >= 0) {
        lines[line] = lines[line].replace(/menuWeight: (\d+)/i, 'sidebar_position: $1');
    }

    if ((line = lines.findIndex(l => l.match(/externalSourceUrl: .+/i))) >= 0) {
        const externalSourceUrl = lines[line].match(/externalSourceUrl: (.+)/i)[1];
        const { body } = await request(externalSourceUrl);
        let text = await body.text();
        text = text.replaceAll(/<img (.*?)(?<!\/)>/g, '<img $1 \/>');
        text = text.replaceAll(/!\[(.*?)]\((.*?)\)/g, (_, alt, src) => {
            return `![$1](${new URL(src, externalSourceUrl).toString()})`;
        });
        const heading = text.match(/^# (.*)/)?.[1];

        if (heading) {
            if ((line = lines.findIndex(l => l.match(/title: .+/i))) >= 0) {
                lines[line] = lines[line].replace(/title: .+/i, 'title: ' + heading);
            } else {
                lines.unshift('title: ' + heading);
            }

            text = text.replace(heading + '\n', '')
        }

        output.push(text);
    }

    let slug;

    if (paths.length > 0) {
        if (paths.find(p => p.trim().endsWith('index'))) {
            slug = '/';
        } else {
            const path = paths.pop().replace('- ', '').trim();
            slug = '/' + path;
        }

        lines.push('slug: ' + slug);
    }

    lines.unshift('---');
    lines.push('---');

    output.unshift(...lines);

    return slug;
}

const BASE_URL = 'https://docs.apify.com';

const newRepl = [
    [
        'https://sdk.apify.com', // sdk-js
        `${BASE_URL}/sdk/js`,
    ],
    [
        'https://docs.apify.com/apify-client-python',
        `${BASE_URL}/api/client/python`,
    ],
    [
        'https://docs.apify.com/apify-client-js',
        `${BASE_URL}/api/client/js`,
    ],
    [
        'https://docs.apify.com(/api)?/cli', // cli
        `${BASE_URL}/cli`,
    ],
    [
        'https://docs.apify.com/(api/v2|tutorials|storage|actors|proxy|web-scraping-101)',
        '/platform/$1',
    ],
    [
        '/platform/api/v2',
        '/api/v2',
    ],
    [
        'https://docs.apify.com/webhooks',
        '/platform/integrations/webhooks',
    ],
    [
        'https://developers.apify.com/academy/(apify-platform/)?',
        '/academy/',
    ],
].map(([from, to]) => [new RegExp(from, 'g'), to]);

function useCustomReplacements(line) {
    return newRepl.reduce((acc, [from, to]) => {
        return acc.replace(from, to);
    }, line);
}

function convertCodeLang(line) {
    if (line.match(/```JavaScript/i)) {
        line = line.replace(/```JavaScript/i, '```js');
    }

    if (line.match(/```TypeScript/i)) {
        line = line.replace(/```TypeScript/i, '```ts');
    }

    if (line.match(/```JSON/i)) {
        line = line.replace(/```JSON/i, '```json');
    }

    if (line.match(/```GraphQL/i)) {
        line = line.replace(/```GraphQL/i, '```graphql');
    }

    return line;
}

async function transformLine(line, cwd) {
    line = convertCodeLang(line);

    if (line.match(/#+ \[]\(#[\w-]+\) .*/)) {
        line = line.replace(/(#+) \[]\(#([\w-]+)\) (.*)/i, '$1 $3 {#$2}');
    }

    if (line.match(/\{\{@asset .*}}/i)) {
        let imgPath = line.match(/\{\{@asset (.*)}}/i)[1];

        if (imgPath.endsWith('.webp')) {
            const files = await globby('sources/**/' + imgPath.replace(/\.webp/, '.png'));

            if (files.length > 0) {
                let path = relative(cwd, files[0]);
                path = path.startsWith('.') ? path : './' + path;
                line = line.replace(/\{\{@asset (.*)}}/i, path);

                return line;
            }
        }

        const files = await globby('sources/**/' + imgPath);

        if (files.length > 0) {
            let path = relative(cwd, files[0]);
            path = path.startsWith('.') ? path : './' + path;
            line = line.replace(/\{\{@asset (.*)}}/i, path);
        }
    }

    line = useCustomReplacements(line);

    return line;
}

async function transformLinksOnLine(line, cwd, source) {
    if (!line.match(/\{\{@link .*}}/i)) {
        return line;
    }

    const links = line.match(/\{\{@link (.*?)(#.+)?}}/ig);
    for (const link of links) {
        const mdPath = link.match(/\{\{@link (.*?)(#.+)?}}/i)[1];
        if (line.startsWith('[Datacenter proxy]({{@link proxy/datacenter_proxy.md}})')) {
            console.log(link, mdPath);
        }
        const files = await globby([
            `sources/${source}/**/${mdPath}`,
            `sources/${source}/**/${mdPath.replace(/\.mdx?$/, '')}/index.md`,
        ]);

        if (files.length === 1) {
            let path = relative(cwd, files[0]);
            path = path.startsWith('.') ? path : './' + path;
            line = line.replace(/\{\{@link (.*?)}}/i, path);
        } else {
            console.error('link not matched to source file', mdPath, source, files);
        }
    }

    return line;
}

// copy everything first
await fs.remove('sources');
await fs.copy('sources_orig', 'sources');

// reshuffle academy content to groups
await fs.mkdirp('sources/academy/glossary');
await fs.move('sources/academy/glossary.md', 'sources/academy/glossary/glossary.md');
await fs.move('sources/academy/concepts', 'sources/academy/glossary/concepts');
await fs.move('sources/academy/concepts.md', 'sources/academy/glossary/concepts.md');
await fs.move('sources/academy/tools', 'sources/academy/glossary/tools');
await fs.move('sources/academy/tools.md', 'sources/academy/glossary/tools.md');

await fs.mkdirp('sources/academy/tutorials-new');
await fs.move('sources/academy/tutorials', 'sources/academy/tutorials-new/tutorials');
await fs.move('sources/academy/tutorials.md', 'sources/academy/tutorials-new/tutorials.md');
await fs.move('sources/academy/node_js', 'sources/academy/tutorials-new/node_js');
await fs.move('sources/academy/node_js.md', 'sources/academy/tutorials-new/node_js.md');
await fs.move('sources/academy/python', 'sources/academy/tutorials-new/python');
await fs.move('sources/academy/python.md', 'sources/academy/tutorials-new/python.md');
await fs.move('sources/academy/php', 'sources/academy/tutorials-new/php');
await fs.move('sources/academy/php.md', 'sources/academy/tutorials-new/php.md');
await fs.move('sources/academy/tutorials-new', 'sources/academy/tutorials');

await fs.mkdirp('sources/academy/platform');
await fs.move('sources/academy/apify_platform.md', 'sources/academy/platform/apify_platform.md');
await fs.move('sources/academy/getting_started', 'sources/academy/platform/getting_started');
await fs.move('sources/academy/getting_started.md', 'sources/academy/platform/getting_started.md');
await fs.move('sources/academy/deploying_your_code', 'sources/academy/platform/deploying_your_code');
await fs.move('sources/academy/deploying_your_code.md', 'sources/academy/platform/deploying_your_code.md');
await fs.move('sources/academy/get_most_of_actors', 'sources/academy/platform/get_most_of_actors');
await fs.move('sources/academy/get_most_of_actors.md', 'sources/academy/platform/get_most_of_actors.md');
await fs.move('sources/academy/running_a_web_server.md', 'sources/academy/platform/running_a_web_server.md');
await fs.move('sources/academy/expert_scraping_with_apify', 'sources/academy/platform/expert_scraping_with_apify');
await fs.move('sources/academy/expert_scraping_with_apify.md', 'sources/academy/platform/expert_scraping_with_apify.md');

await fs.mkdirp('sources/academy/webscraping');
await fs.move('sources/academy/web_scraping_for_beginners', 'sources/academy/webscraping/web_scraping_for_beginners');
await fs.move('sources/academy/web_scraping_for_beginners.md', 'sources/academy/webscraping/web_scraping_for_beginners.md');
await fs.move('sources/academy/puppeteer_playwright', 'sources/academy/webscraping/puppeteer_playwright');
await fs.move('sources/academy/puppeteer_playwright.md', 'sources/academy/webscraping/puppeteer_playwright.md');
await fs.move('sources/academy/api_scraping', 'sources/academy/webscraping/api_scraping');
await fs.move('sources/academy/api_scraping.md', 'sources/academy/webscraping/api_scraping.md');
await fs.move('sources/academy/anti_scraping', 'sources/academy/webscraping/anti_scraping');
await fs.move('sources/academy/anti_scraping.md', 'sources/academy/webscraping/anti_scraping.md');
await fs.move('sources/academy/switching_to_typescript', 'sources/academy/webscraping/switching_to_typescript');
await fs.move('sources/academy/switching_to_typescript.md', 'sources/academy/webscraping/switching_to_typescript.md');
await fs.move('sources/academy/advanced_web_scraping', 'sources/academy/webscraping/advanced_web_scraping');
await fs.move('sources/academy/advanced_web_scraping.md', 'sources/academy/webscraping/advanced_web_scraping.md');

const processed = [];

for (const source of sources) {
    const files = await globby(`${rootPath}sources/${source}/**/*.{md,mdx}`);

    // transformLine copied the files
    for (const filepath of files) {
        const input = (await fs.readFile(filepath, { encoding: 'utf8' })).split('\n');
        const output = [];
        let path = resolve(filepath.replace('sources_orig/', 'sources/'));
        let parentFolder = resolve(path.replace(new RegExp(parse(path).ext + '$'), ''));

        // move the file to the folder with the same name
        if (fs.pathExistsSync(parentFolder)) {
            await fs.remove(path);
            path = parentFolder + '/index' + parse(path).ext;
        } else {
            parentFolder = resolve(parentFolder + '/..');
        }

        // process front matter separately
        let insideFrontmatter = false;
        let inPaths = false;
        const frontmatter = [];
        const paths = [];

        for (const line of input) {
            if (line.trim() === '---') {
                insideFrontmatter = !insideFrontmatter;
                continue;
            }

            if (insideFrontmatter) {
                if (line.trim().startsWith('#')) {
                    continue;
                }

                if (line.includes('paths:')) {
                    inPaths = !inPaths;
                    continue;
                }

                if (inPaths) {
                    paths.push(line.trim());
                    continue;
                }

                frontmatter.push(line);
                continue;
            }

            output.push(await transformLine(line, parentFolder));
        }

        let slug = await transformFrontmatter(frontmatter, [...paths], output);

        if (slug) {
            if (source === 'platform') {
                for (const path of paths) {
                    const slugOfPath = pathToSlug(path);
                    redirects.push(`  rewrite ^${slugOfPath}$ /platform${slug} permanent;`);
                }
            }

            slug = links[path] = `/${source}${slug}`;
        }

        processed.push({ path, output, frontmatter, slug, source, parentFolder });
        await fs.writeFile(path, output.join('\n'));
    }
}

function addTabsImports(output) {
    const idx = output.findIndex((line, no) => no > 0 && line === '---') + 1;
    const append = ['', `import Tabs from '@theme/Tabs';`, `import TabItem from '@theme/TabItem';`];

    if (output[idx].trim() !== '') {
        append.push('');
    }

    output.splice(idx, 0, ...append)
}

// iterate once again to fix absolute links between sources and code tabs
for (const { path, output: input, source, parentFolder, frontmatter } of processed) {
    const output = [];
    const description = frontmatter.find(row => row.startsWith('description: '))?.match(/description: (.*)/)[1].trim();
    let descriptionAdded = false;
    let importsAdded = false;
    let insideTabs = false;

    for (const line of input) {
        if (line.startsWith('```marked-tabs')) {
            insideTabs = true;
            // we might want to make the grouping conditional, but this seems to work good enough too
            output.push('<Tabs groupId="main">');

            if (!importsAdded) {
                addTabsImports(output);
                importsAdded = true;
            }

            continue;
        }

        if (insideTabs && line === '```') {
            insideTabs = false;
            output.push('</Tabs>');
            continue;
        }

        if (insideTabs && line.match(/<marked-tab header="(.*?)" lang="(.*?)">/)) {
            const lang = line.match(/<marked-tab header=".*?" lang="(.*?)">/)[1];
            output.push(line.replace(/<marked-tab header="(.*?)" lang="(.*?)">/, '<TabItem value="$1" label="$1">'));
            output.push('\n```' + convertCodeLang(lang));
            continue;
        }

        if (insideTabs && line === '</marked-tab>') {
            output.push('\n```\n</TabItem>');
            continue;
        }

        output.push(await transformLinksOnLine(line, parentFolder, source));

        if (line.startsWith('# ') && !descriptionAdded) {
            output.push('');
            output.push(`**${description}**`);
            output.push('');
            output.push('---');
            descriptionAdded = true;
        }
    }

    await fs.writeFile(path, output.join('\n'));
}

console.log('redirect rules:');
console.log(redirects.join('\n'));
