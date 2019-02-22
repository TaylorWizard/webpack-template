/*!

@author: Gu
@software: WebStorm
@file: webpack.config.js
@time: 2019-02-18 22:56
@desc:
*/
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

// 正常写入的less
let styleLess = new ExtractTextWebpackPlugin('css/style.css')
// reset
let resetCss = new ExtractTextWebpackPlugin('css/reset.css')

module.exports = {
    // 1.写成数组的方式就可以打出多入口文件，不过这里打包后的文件都合成了一个
    // entry: ['./src/index.js', './src/login.js'],
    // 2.真正实现多入口和多出口需要写成对象的方式
    // entry: {
    //     index: './src/index.js',
    //     login: './src/login.js'
    // },
    entry: {
        index: path.resolve('src/index.js'),
    }, // 入口文件
    output: {
        // filename: 'bundle.js',
        // path: path.resolve('dist')
        // 1. filename: 'bundle.js',
        // 2. [name]就可以将出口文件名和入口文件名一一对应
        filename: '[name].[hash:4].js',
        path: path.resolve('dist')
    }, // 出口文件
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                include: /src/,
                exclude: /node_modules/  // 排除掉node_modules，优化打包速度
            }, {
                test: /\.css$/,
                // use: ['style-loader', 'css-loader'] // 从右向左解析
                // 也可以这样写，这种方式方便写一些配置参数
                use: resetCss.extract({
                    // 将css用link的方式引入就不再需要style-loader了
                    use: ['css-loader', 'postcss-loader']
                })
            }, {
                test: /\.less$/,
                use: styleLess.extract({
                    use: 'css-loader'
                })
            }, {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192, // 小于8k的图片自动转成base64格式，并且不会存在实体图片
                            outputPath: 'images/' // 图片打包后存放的目录
                        }
                    }
                ]
            }, {
                // 页面中经常会用到img标签，img引用的图片地址也需要一个loader来帮我们处理好
                test: /\.(htm|html)$/,
                use: 'html-withimg-loader'
            }, {
                // 字体图标和svg图片都可以通过file-loader来解析
                test: /\.(eot|ttf|woff|svg)$/,
                use: 'file-loader'
            }, {
            }]
    }, // 处理对应模块
    plugins:
        [
            // 通过new一下这个类来使用插件
            new HTMLWebpackPlugin({
                // 用哪个html作为模板
                // 在src目录下创建一个index.html页面当做模板来用
                template: './src/index.html',
                filename: 'index.html',
                chunks: ['index', 'vendor', 'utils'],
                hash: false // 会在打包好的bundle.js后面加上hash串
            }),
            new CleanWebpackPlugin('dist', {
                root: __dirname,
                verbose: true
            }),
            // 拆分成多个style css
            styleLess,
            resetCss,
        ], // 对应的插件
    // resolve我们常用来配置别名和省略后缀名
    resolve: {
        alias: {},
        extensions: ['.js', '.json', '.css', '.less', '.jsx', '.scss']
    },
    // 提取公共代码
    // splitChunksPlugin 提供了两种控制 chunk 抽取模块范围的方式。
    // 一种是 test 属性。这个属性可以传入字符串、正则或者函数，所有的 module
    // 都会去匹配 test 传入的条件，如果条件符合，就被纳入这个 chunk 的备选模块范围。
    // 如果我们传入的条件是字符串或者正则，那匹配的流程是这样的：首先匹配 module 的路径，
    // 然后匹配 module 之前所在 chunk 的 name。
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,   // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor', // 打包后的文件名，任意命名
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10
                },
                utils: {
                    // 抽离自己写的公共代码
                    chunks: 'all',
                    name: 'utils',
                    minSize:0, // 超过0Byte就打包
                }
            }
        }
    },
    mode: 'production'
}
// path.resolve() // absolute working directory
// path.join() // pwd