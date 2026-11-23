import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import globals from 'globals';

export default [
  { ignores: ['dist/**', 'test-results/**'] },
  js.configs.recommended,
  ...vue.configs['flat/essential'],
  {
    files: ['src/**/*.{js,vue}'],
    languageOptions: { globals: { ...globals.browser, naver: 'readonly' } },
    rules: { 'vue/multi-word-component-names': 'off' },
  },
  {
    files: ['*.mjs', 'tests/**/*.mjs'],
    languageOptions: { globals: globals.node },
  },
];
