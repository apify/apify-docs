import { readFileSync, writeFileSync } from 'node:fs';
import { parseDocument } from 'yaml';

const OPENAPI_FILE = 'apify-api/openapi/openapi.yaml';

const datetime = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
const newVersion = `v2 - ${datetime}`;

const content = readFileSync(OPENAPI_FILE, 'utf8');
const doc = parseDocument(content);

if (!doc.hasIn(['info', 'version'])) {
    console.error('Could not find info.version in the OpenAPI spec');
    process.exit(1);
}

// Modify the existing scalar node directly to preserve quote style and formatting
doc.get('info', true).get('version', true).value = newVersion;

writeFileSync(OPENAPI_FILE, doc.toString());
console.log(`Updated OpenAPI version to: ${newVersion}`);
