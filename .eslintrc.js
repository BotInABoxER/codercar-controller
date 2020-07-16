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
    "vue/no-v-html": 0 // Technically not super safe, but the only place it's used is for the blog page, so... 
  },
  "ignorePatterns": []
}
