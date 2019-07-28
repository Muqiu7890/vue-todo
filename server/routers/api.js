const express = require('express')
const apiRouter = express.Router()

const validateUser = (req, res, next) => {
    console.log(req.session.user)
    if (!req.session.user) {
        res.status(401).json({
            message: 'need login'
        })
    } else {
        next()
    }
}

apiRouter.use(validateUser)

const successResponse = (data) => {
    return {
        success: true,
        data
    }
}

apiRouter.all('/api/*', async (req, res, next) => {
    await next()
})

apiRouter
    .get('/api/todos', async (req, res) => {
        const todos = await req.db.getAllTodos()
        console.log(todos)
        res.send(successResponse(todos))
    })
    .post('/api/todo', async (req, res) => {
        console.log(req.body)
        const todos = await req.db.addTodo(req.body)
        res.send(successResponse(todos))
    })
    .put('/api/todo/:id', async (req, res) => {
        const todos = await req.db.updateTodo(req.params.id, req.body)
        res.send(successResponse(todos))
    })
    .delete('/api/todo/:id', async (req, res) => {
        console.log(req.params.id)
        const todos = await req.db.deleteTodo(req.params.id)
        res.send(successResponse(todos))
    })
    .post('/api/delete/completed', async (req, res) => {
        console.log(req.body)
        const data = await req.db.deleteCompleted(req.body.ids)
        res.send(successResponse(data))
    })


module.exports = apiRouter