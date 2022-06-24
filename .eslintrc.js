module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    root: true,
    parser: 'vue-eslint-parser',
    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'standard'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
    },
    plugins: ['vue', '@typescript-eslint'],
    rules: {
        semi: ['error', 'never'],
        indent: ['error', 4],
        'vue/multi-word-component-names': 'off', // 组件名称驼峰检测
        'vue/html-closing-bracket-newline': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: { max: 5 },
                multiline: { max: 5 }
            }
        ], // vue template模板元素第一行最多5个属性
        'vue/html-indent': [
            'warn',
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: []
            }
        ],
        'vue/html-self-closing': [
            'warn',
            {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'any'
                },
                svg: 'always',
                math: 'always'
            }
        ],
        'vue/attributes-order': 'off',
        'vue/html-closing-bracket-spacing': 'off',
        'dot-notation': 'off'
    }
}
