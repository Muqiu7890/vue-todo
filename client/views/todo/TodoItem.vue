<template>
    <div :class="['todo-item',todo.completed ?'completed':'',{editing: currentEditing === todo}]">
        <div class="view">
            <input
                    type="checkbox"
                    class="toggle"
                    :checked="todo.completed"
                    @click="handleToggle"
            />
            <label @dblclick="getCurrentTodo(todo)">{{todo.content}}</label>
            <button
                    class="delete"
                    @click="deleteTodo"
            ></button>
        </div>
        <input class="edit" type="text" :value="getValue" @keyup="updateValue" @blur="doneEdit()"
               @keyup.enter="doneEdit()">
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "TodoItem",
        props: {
            todo: {
                types: Object,
                required: true
            },
            currentEditing: {
                required: true
            }
        },
        computed: mapState({
            getValue(state) {
                return state.todos.filter(i => i.id === this.todo.id)[0].content
            }
        }),
        methods: {
            getCurrentTodo(todo) {
                this.$emit('currentTodo', todo)
            },
            doneEdit() {
                this.$emit('cancelCurrentTodo')
            },
            deleteTodo() {
                this.$emit('deleteOne')
            },
            handleToggle(e) {
                e.preventDefault()
                this.$emit('toggle', this.todo)
            },
            updateValue(e) {
                clearTimeout(this.timeout)
                this.timeout = setTimeout(() => {
                    this.$store.dispatch('updateTodo', {
                        id: this.todo.id,
                        todo: Object.assign({}, this.todo, {
                            content: e.target.value
                        })
                    })
                }, 500)

            }
        }
    }
</script>

<style lang="stylus" scoped>
    .todo-item {
        position: relative
        background-color #fff
        font-size 24px
        border-bottom 1px solid rgba(0, 0, 0, 0.06)
        &:hover {
            .delete:after {
                content '×'
            }
        }
        .edit {
            display none
        }
        label {
            white-space pre-line
            word-break break-all
            padding 15px 60px 15px 15px
            margin-left 45px
            display block
            line-height 1.2
            transition color 0.4s
        }
        &.completed {
            text-decoration line-through
            color #EAEAEA
        }
        &.editing {
            border-bottom none
            padding 0
            .edit {
                display block
                width 520px
                padding 13px 16px 13px 15px
                margin 0 0 0 45px
                font 24px '微软雅黑'
                border-color rgba(55, 94, 99, 0.3)
            }
            .view {
                display none
            }
        }
        .toggle {
            text-align center
            width 40px
            height 40px
            position absolute
            top 0
            bottom 0
            margin auto 0
            border none
            appearance none
            outline none
            &:after {
                content url('../../asserts/images/round.svg')
            }
            &:checked:after {
                content url('../../asserts/images/done.svg')
            }
        }
        input[type=checkbox] {
            -webkit-appearance none
        }
        .delete {
            position absolute
            top 0
            right 10px
            bottom 0
            width 40px
            height 40px
            margin auto 0
            font-size 30px
            color #cc9a9a
            margin-bottom 11px
            transition color 0.2s ease-out
            background-color transparent
            appearance none
            border-width 0
            cursor pointer
            outline none
        }
    }
</style>