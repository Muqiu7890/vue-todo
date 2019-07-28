import axios from 'axios'
import {createError} from "./util";
import notify from "../components/notification/function";

const request = axios.create({
    baseURL: '/'
})

const handleRequest = (request) => {
    return new Promise((resolve, reject) => {
        request.then(res => {
            const data = res.data
            if (!data) {
                return reject(createError(400, 'no data'))
            }
            if (!data.success) {
                return reject(createError(400, data.message))
            }
            resolve(data.data)
        }).catch(err => {
            const res = err.response
            console.log('---------------', res)
            if (res.status === 400) {
                notify({
                    content: '用户名或密码错误'
                })
            }
            if (res.status === 401) {
                reject(createError(401, 'need auth'))
            }
        })
    })
}

export default {
    getAllTodos() {
        return handleRequest(request.get('/api/todos'))
    },
    login(username, password) {
        return handleRequest(request.post('/user/login', {username, password}))
    },
    createTodo(todo) {
        return handleRequest(request.post('/api/todo', todo))
    },
    updateTodo (id, todo) {
        return handleRequest(request.put(`/api/todo/${id}`, todo))
    },
    deleteTodo (id) {
        return handleRequest(request.delete(`/api/todo/${id}`))
    },
    deleteAllCompleted (ids) {
        return handleRequest(request.post('/api/delete/completed', { ids }))
    }

}