import model from '../../model/client-model'
import notify from '../../components/notification/function'
import bus from '../../util/bus'

const handleError = (err) => {
    // handle error
    if (err.code === 401) {
        notify({
            content: '请先登录！！！'
        })
        bus.$emit('auth')
    }
}

export default {
    fetchTodos({commit}) {
        return model.getAllTodos()
            .then((data) => {
                console.log('data',data)
                commit('fetchTodos', data)
            })
            .catch((err) => {
                console.log('todo',err)
                handleError(err)
            })
    },
    login({commit}, {username, password}) {
        return new Promise((resolve, reject) => {
            model.login(username, password)
                .then(data => {
                    commit('login', data)
                    notify({
                        content: '登录成功'
                    })
                    resolve()
                }).catch(err => {
                console.log('errrrr',err)
                handleError(err)
                reject(err)
            })
        })
    },
    addTodo({ commit }, todo) {
        model.createTodo(todo)
            .then(data => {
                commit('add', data)
                notify({
                    content: '你多了一件事哦'
                })
            })
            .catch(err => {
                handleError(err)
            })
    },
    updateTodo ({ commit }, { id, todo }) {
        // commit('startLoading')
        model.updateTodo(id, todo)
            .then(data => {
                commit('update', { id, todo: data })
                // commit('endLoading')
            }).catch(err => {
            handleError(err)
            // commit('endLoading')
        })
    },
    deleteTodo ({ commit }, id) {
        // commit('startLoading')
        model.deleteTodo(id)
            .then(data => {
                commit('delete', id)
                notify({
                    content: '你又少了一件事要做'
                })
                // commit('endLoading')
            }).catch(err => {
            handleError(err)
            // commit('endLoading')
        })
    },
    deleteAllCompleted ({ commit, state }) {
        // commit('startLoading')
        const ids = state.todos.filter(t => t.completed).map(t => t.id)
        model.deleteAllCompleted(ids)
            .then(() => {
                commit('deleteAllCompleted')
                // commit('endLoading')
                notify({
                    content: '清理一下~~~'
                })
            }).catch(err => {
            handleError(err)
            // commit('endLoading')
        })
    },

}