module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  rules: {
    "vue/html-self-closing": "off",
    "space-before-function-paren": "off",
    "quotes": ["warn", "single"],
    "semi": [2, "never"],
    "no-unused-vars": "off",
    "object-shorthand": ["error", "always"],
    "import/order": "off",
    "vue/require-default-prop": 0,
    "vue/singleline-html-element-content-newline": 0,
    "indent": [1, 2],
    "vue/no-v-html": 0
  },
  "ignorePatterns": []
}
