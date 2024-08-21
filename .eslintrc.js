module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ['html'],
  extends: ['plugin:vue/essential', 'eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        tabWidth: 2,
        singleQuote: true,
        jsxSingleQuote: true,
        semi: true,
        trailingComma: 'es5',
        bracketSpacing: true,
        useTabs: false,
        arrowParens: 'avoid',
        endOfLine: 'auto',
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-reserved-component-names': 0,
    'vue/multi-word-component-names': 0,
    'vue/comment-directive': 0,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
};
