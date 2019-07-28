<template>
    <div class="todo">
        <input
                type="text"
                class="add-input"
                autofocus="autofocus"
                placeholder="What needs to be done?"
                @keyup.enter="handleAdd"
        />
        <TodoItem v-for="todo in filtertodos"
                  :todo="todo" :key="todo.id"
                  @currentTodo="currentTodo"
                  @cancelCurrentTodo="cancelCurrentTodo"
                  :currentEditing="currentEditing"
                  @deleteOne="deleteOne(todo)"
                  @toggle="toggleTodoState"/>
        <TodoTab v-if="todos.length > 0"
                 :todos="todos"
                 :filterstate="filterstate"
                 @toggle="toggleState"
                 @clearAll="clearAllCompleted"
        />
    </div>
</template>

<script>
    import TodoItem from './TodoItem.vue'
    import TodoTab from './TodoTab.vue'
    import {mapActions, mapState} from 'vuex'

    export default {
        name: "Todo",
        components: {TodoTab, TodoItem},
        data() {
            return {
                filterstate: 'all',
                currentEditing: 'null'
            }
        },
        computed: {
            ...mapState(['todos']),
            filtertodos: function () {
                switch (this.filterstate) {
                    case 'active': {
                        return this.todos.filter(item => !item.completed);
                        break;
                    }
                    case 'completed': {
                        return this.todos.filter(item => item.completed);
                        break;
                    }
                    default: {
                        return this.todos;
                        break;
                    }
                }
            }
        },
        mounted() {
            this.fetchTodos()
        },
        methods: {
            ...mapActions(['fetchTodos','addTodo','deleteTodo','updateTodo','deleteAllCompleted']),
            handleAdd(e) {
                let todoText = e.target.value.trim()
                if (!todoText.length) {
                    this.$notify({
                        content: '请输入你要做的。。'
                    })
                    return
                } else {
                    const todo = {
                        completed: false,
                        content: todoText
                    }
                    this.addTodo(todo)
                    event.target.value = ''
                }
            },
            toggleTodoState(todo) {
                this.updateTodo({
                    id: todo.id,
                    todo: Object.assign({},todo,{
                        completed: !todo.completed
                    })
                })
            },
            currentTodo(data) {
                this.currentEditing = data
            },
            cancelCurrentTodo() {
                this.currentEditing = null
            },
            deleteOne(todo) {
                this.deleteTodo(todo.id)
            },
            toggleState(state) {
                this.filterstate = state
            },
            clearAllCompleted() {
                this.deleteAllCompleted()
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .todo {
        width 600px
        margin 0 auto
        box-shadow 0 0 10px #666
    }

    .add-input {
        position relative
        margin 0
        width 100%
        font-size 20px
        font-family inherit
        font-weight inherit
        line-height 1.4em
        outline none
        color inherit
        box-sizing border-box
        font-smoothing antialiased
        padding 16px 16px 16px 36px
        border none
        box-shadow inset 0 -2px 1px rgba(0, 0, 0, 0.03)
    }
</style>