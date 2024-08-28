const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  // publicPath: process.env.NODE_ENV === 'production' ? '/culture-day/' : '/',
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  outputDir: './dist',
  transpileDependencies: [],
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
                    @import "@/assets/styles/_variable.scss";
                `,
      },
    },
  },
});
