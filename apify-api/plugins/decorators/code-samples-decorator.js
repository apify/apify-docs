const { existsSync } = require('fs');
const path = require('path');

const X_CODE_SAMPLES_PROPERTY = 'x-codeSamples';

const LANGUAGES = [
    { lang: 'JavaScript', label: 'JS client' },
];

/**
 * This decorator adds the x-codeSamples property to the schema object if a file with the operationId exists in the
 * code samples directory.
 * This helps us add the samples in a consistent way and find out which operations are missing a sample.
 *
 * The added sample link will look like this:
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS client
 *     source:
 *        $ref: ../../code_samples/js/acts_post.js
 */
function CodeSamplesDecorator(target) {
    if (!target.operationId) return;

    const codeSamples = [];

    for (const { lang, label } of LANGUAGES) {
        const codeSamplePath = path.join(__dirname, `../../openapi/code_samples/${lang.toLowerCase()}/${target.operationId}.js`);

        if (!existsSync(codeSamplePath)) {
            // Just use this console log in development to see which operations are missing a code sample.
            // console.log(`Missing code sample for operation ${target.operationId}`);
            return;
        }

        codeSamples.push({
            lang,
            label,
            source: {
                $ref: codeSamplePath,
            },
        });
    }

    if (codeSamples.length) {
        target[X_CODE_SAMPLES_PROPERTY] = codeSamples;
    }
}

module.exports = () => ({
    // Redocly is using a visitor pattern. What the following code does is that whenever the traverser leaves a node of
    // type Tag or Operation, it executes CodeSamplesDecorator on it.
    Tag: {
        leave: CodeSamplesDecorator,
    },
    Operation: {
        leave: CodeSamplesDecorator,
    },
});