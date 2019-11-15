const marked = require('marked');
const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const { browseAll, updateIndex, algoliaSearchIndex } = require('./algolia');

/**
 * Replace markdown link with just text e.g:
 * [Datacenter proxy](/proxy/datacenter-proxy) -> Datacenter proxy
 * @param {string} text
 * @return {string}
 */
const replaceLinksWithText = (text) => {
    return text.replace(/(?:__|[*#])|\[(.*?)\]\(.*?\)/gm, '$1');
};

/**
 * Omit images from markdown text
 * @param {string} text
 * @return {string}
 */
const omitImagesFromText = (text) => {
    if (!text) return '';
    // eslint-disable-next-line no-useless-escape
    return text.replace(/\!\[.*\]\(.*\)/gm, '');
};

/**
 * Parse title and hash from Apify markdown heading
 * [](#troubleshooting)Troubleshooting ->
 * {title: 'Troubleshooting', hash: '#troubleshooting'}
 * @param {string} text
 * @return {{title, hash}}
 */
const parseHeadingText = (text) => {
    const match = text.match(/\((.*)\)(.*)/);
    if (match) {
        // eslint-disable-next-line no-unused-vars
        const [fullMatch, hash, title] = match;
        return {
            hash,
            title,
        };
    }
    return {
        title: text,
        hash: '',
    };
};

/**
 * It parses all markdown files stored in index.json a return all pages to index into algolia
 */
const generatePages = async (baseUrl) => {
    let indexJson;
    try {
        // eslint-disable-next-line global-require
        indexJson = require('../build/index.json');
    } catch (err) {
        throw new Error('It looks index.json doesn\'t exist in build dir. Try to npm run build again!');
    }

    // Get correct file path for each markdown file from index.json
    const markdownPathsWithMetadata = [];
    Object.keys(indexJson.pages).forEach((myPath) => {
        const filePath = path.join(__dirname, `../build/pages/${myPath}`);
        markdownPathsWithMetadata.push({
            ...indexJson.pages[myPath],
            filePath,
        });
    });

    // Parse each markdown file and returns page to index to algolie
    const pagesToIndex = [];
    markdownPathsWithMetadata.forEach((markdown) => {
        const file = fs.readFileSync(markdown.filePath);
        const tokens = marked.lexer(file.toString(), {});
        const urlPath = markdown.path === 'index' ? '' : markdown.path;

        let h1; let h2; let page;
        const pages = [];
        tokens.forEach((token) => {
            if (token.type === 'heading') {
                // Short validation
                if (!h1 && token.depth !== 1) throw new Error(`This first heading is not h1 in ${markdown.filePath}!`);
                if (h1 && token.depth === 1) throw new Error(`There are multiple h1s in ${markdown.filePath}!`);

                const parsedText = parseHeadingText(token.text);
                if (token.depth === 1) {
                    h1 = {
                        ...token,
                        parsedText,
                    };
                    page = {
                        url: `${baseUrl}/${urlPath}`,
                        title: h1.parsedText.title,
                        text: '',
                    };
                } else if (token.depth === 2) {
                    if (h1 || h2) {
                        pages.push(page);
                    }
                    h2 = {
                        ...token,
                        parsedText,
                    };
                    page = {
                        url: `${baseUrl}/${urlPath}/${h2.parsedText.hash}`,
                        title: `${h1.parsedText.title}: ${h2.parsedText.title}`,
                        text: '',
                    };
                } else {
                    page.text += `${parsedText.title}\n`;
                }
            } else if (token.type !== 'space') {
                let text = omitImagesFromText(token.text);
                text = replaceLinksWithText(text);
                page.text += `${text}\n`;
            }
        });

        pagesToIndex.push(...pages);
    });

    return pagesToIndex.map((page) => {
        return {
            ...page,
            type: 'docs',
            crawledBy: 'docsCrawler',
        };
    });
};

/**
 * Runs indexing markdown to algolia search index
 * @return {Promise<void>}
 */
const main = async () => {
    // Check env vars
    const { BASE_URL, ALGOLIA_INDEX_NAME, ALGOLIA_APP_ID, ALGOLIA_API_KEY } = process.env;
    if (!BASE_URL || !ALGOLIA_INDEX_NAME || !ALGOLIA_APP_ID || !ALGOLIA_API_KEY) {
        throw Error('Some environment variables missing!');
    }
    // Compare scraped pages with pages already saved to index and creates object with differences
    const pagesInIndex = await browseAll(algoliaSearchIndex, 'docsCrawler');
    console.log(`There are ${pagesInIndex.length} pages in the index for docsCrawler.`);
    const pagesInIndexByUrl = _.indexBy(pagesInIndex, 'url');

    const currentPages = await generatePages(BASE_URL);

    const pagesDiff = {
        pagesToAdd: {},
        pagesToUpdate: {},
        pagesToRemove: pagesInIndexByUrl,
    };

    currentPages.forEach((page) => {
        const { url } = page;
        if (pagesInIndexByUrl[url]) {
            pagesDiff.pagesToUpdate[url] = {
                ...page,
                objectID: pagesInIndexByUrl[url].objectID,
            };
        } else {
            pagesDiff.pagesToAdd[url] = page;
        }
        delete pagesDiff.pagesToRemove[url];
    });

    // Performs updates in index
    if (process.env.UPDATE_INDEX) await updateIndex(algoliaSearchIndex, pagesDiff);
    else {
        console.log('Index updates were skipped!');
        console.dir(pagesDiff);
    }
};

main().then(() => console.log('Done'))
    .catch(err => console.error(err));
