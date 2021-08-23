const path = require('path');
module.exports = {
    productionSourceMap: false,
    outputDir: path.resolve(__dirname, '../../public'),
    configureWebpack: {
        devtool: 'source-map',
        resolve: {
            alias: {
                '@': path.resolve('src'),
                '@c': path.resolve('src/components'),
                '@a': path.resolve('src/assets'),
                '@h': path.resolve('../helpers'),
            },
        }
    },
    chainWebpack: config => config.resolve.symlinks(false),
    transpileDependencies: [
        'vuetify'
    ]
}
