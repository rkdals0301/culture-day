const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
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
