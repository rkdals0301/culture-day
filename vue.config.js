const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    publicPath: process.env.NODE_ENV === 'production' ? '/culture-day' : '/',
    outputDir: './docs',
    transpileDependencies: [],
    css: {
        loaderOptions: {
            scss: {
                additionalData: `
					@import "@/styles/global.scss";
                    @import "@/styles/color.scss";
				`,
            },
        },
    },
})
