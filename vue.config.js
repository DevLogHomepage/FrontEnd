const path =  require('path')

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
        alias: {
            '@core-rest': path.join(__dirname, 'src/core/rest'),
            '@core-graphQL': path.join(__dirname, 'src/core/graphQL'),
        },
        extensions: [".js", ".vue", ".json",".ts"],
    }
}
})
