const sha1 = require('sha1')
const axios = require('axios')

const className = 'todo' // APICloud命名空间

const request = axios.create({
    baseURL: 'https://d.apicloud.com/mcm/api'
})

const createError = (code, res) => {
    const err = new Error(res.message)
    err.code = code
    return err
}

const handleRequest = ({ status, data, ...rest }) => {
    if (status === 200) {
        // console.log(data)
        return data
    } else {
        console.log('qqqqqqq')
        throw createError(status, rest)
    }
}

module.exports = (appId, appKey) => {
    const getHeaders = () => {
        const now = Date.now()
        // console.log(`${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`)
        return {
            'x-APICloud-AppId': appId,
            'X-APICloud-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
        }
    }
    return {
        async getAllTodos () {
            return handleRequest(await request.get(`/${className}`, {
                headers: getHeaders()
            }))
        },
        async addTodo (todo) {
            return handleRequest(await request.post(`${className}`, todo, {
                headers: getHeaders()
            }))
        },
        async updateTodo (id, todo) {
            return handleRequest(await request.put(`/${className}/${id}`, todo, {
                headers: getHeaders()
            }))
        },
        async deleteTodo (id) {
            return handleRequest(await request.delete(`/${className}/${id}`, {
                headers: getHeaders()
            }))
        },
        async deleteCompleted (ids) {
            const requests = ids.map(id => {
                return {
                    method: 'DELETE',
                    path: `/mcm/api/${className}/${id}`
                }
            })
            return handleRequest(await request.post(
                '/batch',
                { requests },
                { headers: getHeaders() }
            ))
        }
    }
}