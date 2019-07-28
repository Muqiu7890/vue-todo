export default {
    fetchTodos(state, todos) {
        state.todos = todos
    },
    login(state, userInfo) {
        state.user = userInfo
    },
    add(state, todo) {
        state.todos.unshift(todo)
    },
    update (state, { id, todo }) {
        state.todos.splice(
            state.todos.findIndex(t => t.id === id),
            1,
            todo
        )
    },
    delete (state, id) {
        state.todos.splice(
            state.todos.findIndex(t => t.id === id),
            1
        )
    },
    deleteAllCompleted (state) {
        state.todos = state.todos.filter(t => !t.completed)
    }

}