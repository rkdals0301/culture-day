const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    publicPath: process.env.NODE_ENV === "production" ? "/culture-day/" : "/",
    outputDir: "./dist",
    transpileDependencies: [],
    css: {
        loaderOptions: {
            scss: {
                additionalData: `
                    @import "@/assets/styles/reset.scss";
                    @import "@/assets/styles/color.scss";
					@import "@/assets/styles/global.scss";
				`,
            },
        },
    },
});
