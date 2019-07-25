const express = require('express')
const path = require('path')
const fs = require('fs')
const axios = require('axios');
const MemoryFS = require('memory-fs') // 扩展了fs模块功能，不把数据写入磁盘上面而是内存
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../bulid/webpack.config.server')

const router = express.Router()

let serverBundle

const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs

// webpack重新打包后 拿到最新服务端打包的东西
serverCompiler.watch({}, async (err, stats) => {
    if (err) return console.log(err);

    stats = stats.toJson()
    stats.errors.forEach(err => console.log(err))
    stats.warnings.forEach(warn => console.log(warn))
    //  获取server bundle的json文件
    const bundlePath = path.join(
        serverConfig.output.path,
        'vue-ssr-server-bundle.json'
    )
    // console.log('bundlePath',bundlePath)
    serverBundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
    // console.log(serverBundle)
    console.log('new bundle generated')
})


const handleSSR = async (req, res) => {
    if (!serverBundle) {
        res.end('wait a second...')
        return
    }
    let clientManifestResp

    try {
        // 可以拿到打包后静态资源的路径
        clientManifestResp =await axios.get("http://localhost:8000/public/vue-ssr-client-manifest.json")
    } catch (error) {
        console.log('aaaaa',error)
    }

    const clientManifest = clientManifestResp.data
    // console.log('clientManifest',clientManifest)

    const template = fs.readFileSync(path.join(__dirname, '../template.ejs'), 'utf-8')

    // 解决每次编辑代码后 重启服务的问题(createBundleRenderer)
    const renderer = VueServerRenderer
        .createBundleRenderer(serverBundle, {
            inject: false, // 手动注入资源
            clientManifest
        })
    // console.log('renderer',renderer)
    try {
        await serverRender(req, res, renderer, template)
    } catch (e) {
        console.log('server-render')
        console.log(e)
    }
}

router.get('*', handleSSR)

module.exports = router






