const ejs = require('ejs')

module.exports = async (req, res, renderer, template) => {
    res.setHeader("Content-Type", "text/html");
    /*
     下面context会暴露出renderStyles()、renderState(options?: Object)、renderScripts()、
     renderResourceHints()、getPreloadFiles()这几种方法
    */
    const context = {url : req.url}
    console.log('context',context)
    try {
        const appString = await renderer.renderToString(context)
        const html = ejs.render(template, {
                appString,
                style: context.renderStyles(),
                scripts: context.renderScripts()
            })
        res.end(html)
    } catch (err) {
        console.log('render',err)
        throw err
    }
}