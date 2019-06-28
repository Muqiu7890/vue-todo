const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const WebpackDevServer = require('webpack-dev-server');

const isDev = process.env.NODE_ENV === "development"

const config = {  //导出一个具有特殊属性的对象
    target: "web",
    entry: path.join(__dirname,'./src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist')
    },
    mode: 'none',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options:{
                            limit: 1024,
                            name: '[name].[ext]'
                        }
                    }
                ]
            }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HtmlWebpackPlugin({
            // 指定生成的文件依赖的html文件模板
            template:__dirname + '/src/index.html',
        }),
        new VueLoaderPlugin(),
    ]
};

if(isDev) {
    config.module.rules.push({
        test: /\.styl/,
        use: [
            'style-loader',
            'css-loader',
            'stylus-loader'
        ]
    })
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port: '8000',
        host: '0.0.0.0',
        overlay: {
            errors: true,
        },
        hot: true
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )

}

module.exports = config;