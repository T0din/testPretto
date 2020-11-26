module.exports = {
    parser: 'babel-eslint',
    env: {
        node: true,
        es6: true,
        jest: true,
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
        },
    },
    plugins: ['import'],
    extends: ['eslint:recommended', 'plugin:import/recommended'],
    rules: {
        // import plugin
        'import/no-unresolved': ['error', { ignore: ['^@vamos'] }],
        'import/unambiguous': 'off',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/order': [
            'error',
            {
                groups: [
                    ['external', 'builtin'],
                    ['index', 'sibling', 'parent', 'internal'],
                ],
                'newlines-between': 'always',
            },
        ],
        // eslint
        quotes: ['error', 'single', { avoidEscape: true }],
        'object-curly-newline': ['error', { multiline: true, consistent: true }],
        'object-curly-spacing': ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
        'one-var': ['error', 'never'],
        camelcase: ['error', { properties: 'never' }],
        'array-element-newline': 'off',
        'padded-blocks': ['error', 'never'],
        'object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
        'arrow-parens': ['error', 'as-needed'],
        'multiline-ternary': ['error', 'always-multiline'],
        'no-underscore-dangle': ['error', { allow: ['__', '_json', '__NEXT_DATA__'] }],
        'sort-imports': 'off', // use eslint-import instead
        'dot-location': ['error', 'property'],
        'arrow-body-style': ['error', 'as-needed'],
        'func-style': ['error', 'expression', { allowArrowFunctions: true }],
        'function-paren-newline': 'off',
        'lines-around-comment': [
            'error',
            {
                beforeLineComment: false,
                beforeBlockComment: false,
                allowBlockStart: true,
                allowBlockEnd: true,
            },
        ],
        'object-shorthand': 'error',
        'newline-per-chained-call': 'off',
        'multiline-comment-style': 'off',
        'brace-style': ['error', '1tbs', { allowSingleLine: true }],
        'no-invalid-this': 'error',
        'no-nested-ternary': 'error',
    },
    settings: {
        'import/resolver': {
            node: true,
            'babel-module': true,
        },
        react: {
            version: '16.0',
        },
    },
};
