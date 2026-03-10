import CodeSamplesDecorator from './decorators/code-samples-decorator.mjs';
import LegacyDocUrlDecorator from './decorators/legacy-doc-url-decorator.mjs';

export default () => ({
    id: 'apify',
    decorators: {
        oas3: {
            'legacy-doc-url-decorator': LegacyDocUrlDecorator,
            'code-samples-decorator': CodeSamplesDecorator,
        },
    },
});
