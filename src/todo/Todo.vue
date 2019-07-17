<template>
    <div class="todo">
        <input
                type="text"
                class="add-input"
                autofocus="autofocus"
                placeholder="What needs to be done?"
                @keyup.enter="addTodo"
        />
        <TodoItem v-for="(todo,index) in filtertodos"
                  :todo="todo" :key="todo.id"
                  @currentTodo="currentTodo"
                  @cancelCurrentTodo="cancelCurrentTodo"
                  :currentEditing="currentEditing"
                  @deleteOne="deleteOne(index)"/>
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

    export default {
        name: "Todo",
        components: {TodoTab, TodoItem},
        data() {
            return {
                todos: [],
                filterstate: 'all',
                currentEditing: 'null'
            }
        },
        computed: {
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
        methods: {
            addTodo(e) {
                let todoText = e.target.value.trim()
                if (!todoText.length) {
                    return
                } else {
                    const last = this.todos[this.todos.length-1]
                    const id = last ? last.id + 1 : 1
                    this.todos.push({
                        id,
                        completed: false,
                        content: todoText
                    })
                    event.target.value = ''
                }
            },
            currentTodo(data) {
                this.currentEditing = data
            },
            cancelCurrentTodo() {
                this.currentEditing = null
            },
            deleteOne(delIndex) {
                this.todos.splice(delIndex, 1)
            },
            toggleState(state) {
                this.filterstate = state
            },
            clearAllCompleted() {
                this.todos = this.todos.filter(todo => !todo.completed)
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