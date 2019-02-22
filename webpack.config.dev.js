/*!

@author: Gu
@software: WebStorm
@file: webpack.config.dev.js.js
@time: 2019-02-22 12:35
@desc:
*/
const webpack = require('webpack')
const _ = require('lodash')
let baseConfig = require('./webpack.config')
let devConfig = _.cloneDeep(baseConfig)

devConfig.devServer = { // 开发服务器配置
    contentBase: './dist',
        host: 'localhost',      // 默认是localhost
        port: 3000,             // 端口
        open: true,             // 自动打开浏览器
        hot: true               // 开启热更新
}
devConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
devConfig.mode = 'development'
module.exports = devConfig
