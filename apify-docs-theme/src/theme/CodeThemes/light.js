export const lightTheme = {
    plain: {
        color: 'black',
        backgroundColor: '#f8f9fc',
    },
    styles: [
        {
            types: ['prolog', 'doctype', 'cdata'],
            style: {
                color: 'slategray',
            },
        },
        {
            types: ['punctuation'],
            style: {
                color: '#999',
            },
        },
        {
            types: ['namespace'],
            style: {
                opacity: 0.7,
            },
        },
        {
            types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol', 'deleted'],
            style: {
                color: '#905',
            },
        },
        {
            types: ['selector', 'attr-name', 'string', 'char', 'builtin', 'inserted'],
            style: {
                color: '#690',
            },
        },
        {
            types: ['operator', 'entity', 'url'],
            style: {
                color: '#9a6e3a',
                backgroundColor: 'hsla(0, 0%, 100%, 0.5)',
            },
        },
        {
            types: ['atrule', 'attr-value', 'keyword'],
            style: {
                color: '#07a',
            },
        },
        {
            types: ['function', 'class-name'],
            style: {
                color: '#DD4A68',
            },
        },
        {
            types: ['comment'],
            style: {
                color: 'slategray',
                fontStyle: 'italic',
            },
        },
        {
            types: ['regex'],
            style: {
                color: '#e90',
            },
        },
        {
            types: ['important'],
            style: {
                color: '#e90',
                fontWeight: 'bold',
            },
        },
        {
            types: ['variable'],
            style: {
                color: '#e90',
            },
        },
        {
            types: ['bold'],
            style: {
                fontWeight: 'bold',
            },
        },
        {
            types: ['italic'],
            style: {
                fontStyle: 'italic',
            },
        },
    ],
};
