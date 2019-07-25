const express = require('express')
const app = express()
const pageRouter = require('./routers/dev-ssr')
// const vueRender = require("vue-server-renderer");
// const createApp = require('./app')

const isDev = process.env.NODE_ENV === 'devlopment'

app.get('*', async (req, res, next) => {
    try {
        console.log(`request with path ${req.path}`)
        await next()
    } catch (err) {
        console.log(err)
        res.status = 500
        if (isDev) {
            res.body = err.message
        } else {
            res.bosy = 'please try again later'
        }
    }
})

app.use(pageRouter)

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 5000

app.listen(PORT, HOST, () => {
    console.log(`server is listening on ${HOST}:${PORT}`)
})