module.exports = {
    env: {
        es6: true,
        node: true,
        browser: true
    },
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 8,
        sourceType: 'module',
        ecmaFeatures: {
            experimentalObjectRestSpread: true
        }
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/recommended'
    ],
    globals: {jquery: true, $: true},
    rules: {
        'for-direction': 'error',
        'no-console': 'off',
        'no-debugger': 'off',
        
        'curly': 'error',
        'eqeqeq': ['error', 'always'],
        'no-multi-spaces': ['error', {ignoreEOLComments: true}],
        'no-multi-str': 'error',
        'no-script-url': 'error',
        'no-self-compare': 'error',
        'no-throw-literal': 'error',
        'no-useless-concat': 'error',
        'no-void': 'error',
        'vars-on-top': 'error',
        'yoda': 'off',
        'no-useless-escape': 'off',
        'no-unused-vars': ['error', {'args': 'none'}],
        'no-unreachable': 'warn',
        
        'init-declarations': ['error', 'always'],
        
        'global-require': 'error',
        'handle-callback-err': ['error', '^.*(e|E)rr'],
        'no-mixed-requires': 'error',
        'no-new-require': 'error',
        
        'array-bracket-spacing': ['error', 'never'],
        'block-spacing': 'error',
        'comma-spacing': ['error', {'before': false, 'after': true}],
        'comma-style': ['error', 'last'],
        'computed-property-spacing': ['error', 'never'],
        'func-call-spacing': ['error', 'never'],
        'func-style': ['error', 'declaration', {'allowArrowFunctions': true}],
        'id-blacklist': ['error'],
        'indent': ['error', 4, {'SwitchCase': 1}],
        'key-spacing': ['error', {'beforeColon': false, 'afterColon': true}],
        'keyword-spacing': ['error', {'before': true}],
        'max-params': ['error', 7],
        'no-lonely-if': 'off',
        'no-nested-ternary': 'error',
        'no-trailing-spaces': ['error', {'skipBlankLines': true}],
        'no-whitespace-before-property': 'error',
        'object-property-newline': ['error', {'allowMultiplePropertiesPerLine': true}],
        'padded-blocks': ['error', 'never'],
        'quote-props': ['error', 'as-needed'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'semi-spacing': 'error',
        'semi-style': ['error', 'last'],
        'space-in-parens': ['error', 'never'],
        'switch-colon-spacing': ['error'],
        'no-extra-boolean-cast': 'off',
        
        'arrow-body-style': ['error', 'as-needed'],
        'arrow-parens': ['error', 'as-needed'],
        'arrow-spacing': ['error', {'before': true, 'after': true}],
        'no-confusing-arrow': ['error', {'allowParens': true}],
        'no-duplicate-imports': 'error',
        'no-useless-constructor': 'error',
        'no-var': 'error',
        'prefer-template': 'error',
        'rest-spread-spacing': 'error',
        'template-curly-spacing': 'error',
        
        'vue/valid-v-model': 'off'
    }
};