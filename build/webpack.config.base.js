const path = require('path');
const vueLoaderOptions = require('./vue-loader.config')

const isDev = process.env.NODE_ENV === "development"

const config = {  //导出一个具有特殊属性的对象
    target: "web",
    entry: path.join(__dirname, '../client/client-entry.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: 'http://127.0.0.1:8000/public/'
    },
    mode: 'none',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderOptions(isDev)
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: 'resources/[path][name]-[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }]
    }
};

module.exports = config;

