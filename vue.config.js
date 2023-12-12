const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    publicPath: '/culture-day',
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
