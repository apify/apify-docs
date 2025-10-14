import ClientReferencesLinksDecorator from './decorators/client-references-links-decorator.mjs';
import CodeSamplesDecorator from './decorators/code-samples-decorator.mjs';
import LegacyDocUrlDecorator from './decorators/legacy-doc-url-decorator.mjs';

export default () => ({
    id: 'apify',
    decorators: {
        oas3: {
            'legacy-doc-url-decorator': LegacyDocUrlDecorator,
            'client-references-links-decorator': ClientReferencesLinksDecorator,
            'code-samples-decorator': CodeSamplesDecorator,
        },
    },
});
