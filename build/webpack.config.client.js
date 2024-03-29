const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const isDev = process.env.NODE_ENV === "development"
let config = {}

const devServer = {
    port: '8000',
    host: '0.0.0.0',
    overlay: {
        errors: true,
    },
    headers: {'Access-Control-Allow-Origin': '*'},
    // 解决单页面应用出现的404（所访问资源在服务器找不到）
    // 若找不到资源 则返回默认首页
    historyApiFallback: {
        index: '/public/index.html'
    },
    proxy: {
        '/api': 'http://127.0.0.1:5000',
        '/user': 'http://127.0.0.1:5000'
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
        template: './client/index.html',
    }),
    new VueLoaderPlugin(),
    new VueClientPlugin()
]

if (isDev) {
    config = merge(baseConfig, {
        module: {
            rules: [
                {
                    test: /\.styl(us)?$/,
                    use: [
                        'vue-style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                // modules: true,
                                // localIdentName: '[path]-[name]-[hash:base64:5]',
                                camelCase: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {sourceMap: true}
                        },
                        'stylus-loader',
                    ],
                }
            ]
        },
        devtool: '#cheap-module-eval-source-map',
        devServer,
        plugins: defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin()
        ])
    })
} else {
    config = merge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../client/client-entry.js'),
            vendor: ['vue'] // 打包类库
        },
        output: {
            filename: '[name].[chunkhash:8].js',
            publicPath: '/public/'
        },
        module: {
            rules: [
                {
                    test: /\.styl(us)?$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                // modules: true,
                                // localIdentName: '[path]-[name]-[hash:base64:5]',
                                camelCase: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {sourceMap: true}
                        },
                        'stylus-loader',
                    ],
                }
            ]
        },
        plugins: defaultPlugins.concat([
            new MiniCssExtractPlugin({filename: 'style.[hash:8].css'})
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

config.resolve = {
    alias: {
        'model': path.join(__dirname, '../client/model/client-model.js')
    }
}

module.exports = config;