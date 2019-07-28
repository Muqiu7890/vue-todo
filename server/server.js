const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const favicon = require('serve-favicon')
const createDb = require('./db/db')
const config = require('../app.config')
const apiRouter = require('./routers/api')
const userRouter = require('./routers/user')

const isDev = process.env.NODE_ENV === 'devlopment'
const db = createDb(config.db.appId, config.db.appKey)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        // secure: true,
        httpOnly: true,
        maxAge: 2 * 60 * 60 * 1000
    }
}))

app.use(favicon(path.join(__dirname, '../favicon.ico')))
app.use('/public', express.static('public'))

app.use(async (req, res, next) => {
    try {
        console.log(`request with path ${req.path}`)
        await next()
    } catch (err) {
        console.log(err)
        res.status = 500
        if (isDev) {
            res.send = err.message
        } else {
            res.send = 'please try again later'
        }
    }
})

app.use((req, res, next) => {
    req.db = db
    next()
})

app.use(userRouter)
// app.use((req,res,next) => {
//     console.log(req.session.user)
//     if(!req.session.user) {
//         res.status(401).json({
//             message: 'need login'
//         })
//     } else {
//         next()
//     }
// })
app.use(apiRouter)

let pageRouter
if(isDev) {
    pageRouter = require('./routers/dev-ssr')
} else {
    pageRouter = require('./routers/ssr')
}

app.use(pageRouter)

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 5000

app.listen(PORT, HOST, () => {
    console.log(`server is listening on ${HOST}:${PORT}`)
})