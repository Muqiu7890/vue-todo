const ejs = require('ejs')

module.exports = async (req, res, renderer, template) => {
    res.setHeader("Content-Type", "text/html");
    /*
     下面context会暴露出renderStyles()、renderState(options?: Object)、renderScripts()、
     renderResourceHints()、getPreloadFiles()这几种方法
    */
    const context = {url: req.url,user: req.session.user}
    try {
        const appString = await renderer.renderToString(context)

        const {title} = context.meta.inject()
        const html = ejs.render(template, {
            appString,
            style: context.renderStyles(),
            scripts: context.renderScripts(),
            title: title.text(),
            initalState: context.renderState()
        })
        res.end(html)
    } catch (err) {
        console.log('render', err)
        throw err
    }
}