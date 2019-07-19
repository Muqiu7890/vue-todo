const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const WebpackDevServer = require('webpack-dev-server');
// 将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const isDev = process.env.NODE_ENV === "development"
let config = {}

const devServer = {
    port: '8000',
    host: '0.0.0.0',
    overlay: {
        errors: true,
    },
    hot: true
}

const defaultPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new HtmlWebpackPlugin({
        // 指定生成的文件依赖的html文件模板
        template: './src/index.html',
    }),
    new VueLoaderPlugin(),
]

if (isDev) {
    config = merge(baseConfig, {
        module: {
            rules: [
                {
                    test: /\.styl(us)?$/,
                    oneOf: [
                        // 这里匹配 `<style module>`
                        {
                            resourceQuery: /module/,
                            use: [
                                'vue-style-loader',
                                {
                                    loader: 'css-loader',
                                    options: {
                                        modules: true,
                                        localIdentName: '[path]-[name]-[hash:base64:5]',
                                        camelCase: true
                                    }
                                },
                                'stylus-loader'
                            ]
                        },
                        {
                            use: [
                                'vue-style-loader',
                                'css-loader',
                                'stylus-loader'
                            ]
                        }
                    ],
                }
            ]
        },
        devtool: '#cheap-module-eval-source-map',
        devServer,
        plugins: defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
    })
} else {
    config = merge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../src/index.js'),
            vendor: ['vue'] // 打包类库
        },
        output: {
            filename: "[name].[chunkhash:8].js"
        },
        module: {
            rules: [
                {
                    test: /\.styl(us)?$/,
                    oneOf: [
                        // 这里匹配 `<style module>`
                        {
                            resourceQuery: /module/,
                            use: [
                                'vue-style-loader',
                                {
                                    loader: 'css-loader',
                                    options: {
                                        modules: true,
                                        localIdentName: '[hash:base64:5]',
                                        camelCase: true
                                    }
                                },
                                'stylus-loader'
                            ]
                        },
                        {
                            use: [
                                'vue-style-loader',
                                'css-loader',
                                'stylus-loader'
                            ]
                        }
                    ]
                }
            ]
        },
        plugins: defaultPlugins.concat([
            new MiniCssExtractPlugin({filename: 'style.[contentHash:8].css'})
        ]),
        optimization: {
            splitChunks: {
                cacheGroups: { // 这里开始设置缓存的 chunks
                    commons: {
                        chunks: 'initial',      // 必须三选一： "initial" | "all" | "async"(默认就是异步)
                        minSize: 0,             // 最小尺寸，默认0,
                        minChunks: 2,           // 最小 chunk ，默认1
                        maxInitialRequests: 5   // 最大初始化请求书，默认1
                    },
                    vendor: {
                        test: /node_modules/,   // 正则规则验证，如果符合就提取 chunk
                        chunks: 'initial',      // 必须三选一： "initial" | "all" | "async"(默认就是异步)
                        name: 'vendor',         // 要缓存的 分隔出来的 chunk 名称
                        priority: 10,           // 缓存组优先级
                        enforce: true
                    }
                },
            },
            runtimeChunk: true
        }
    })
}

module.exports = config;