const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  // publicPath: process.env.NODE_ENV === 'production' ? '/culture-day/' : '/',
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  outputDir: './dist',
  transpileDependencies: [],
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_SEOUL_URL,
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
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
