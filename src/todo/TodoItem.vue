<template>
    <div :class="['todo-item',todo.completed ?'completed':'',{editing: currentEditing === todo}]">
        <input
                type="checkbox"
                class="toggle"
                v-model="todo.completed"
        />
        <label @dbclick="editTodo">{{todo.content}}</label>
        <button
                class="delete"
                @click="deleteTodo"
        ></button>
    </div>
</template>

<script>
    export default {
        name: "TodoItem",
        props: {
            todo: {
                types: Object,
                required: true
            },
            currentEditing: {
                type: String,
                required: true
            }
        },
        methods: {
            editTodo() {

            },
            deleteTodo() {
                this.$emit('deleteOne')
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .todo-item {
        position: relative
        background-color: #fff
        font-size: 24px
        border-bottom: 1px solid rgba(0, 0, 0, 0.06)
        &:hover {
            .delete:after {
                content: '×'
            }
        }
        label {
            white-space: pre-line
            word-break: break-all
            padding: 15px 60px 15px 15px
            margin-left: 45px
            display: block
            line-height: 1.2
            transition: color 0.4s
        }
        editing {
            label {
                boder 1px solid orange
            }
        }
        &.completed {
            label {
                color: #d9d9d9
                text-decoration: line-through
            }
        }
        .toggle {
            text-align: center
            width: 40px
            height: 40px
            position: absolute
            top: 0
            bottom: 0
            margin: auto 0
            border: none
            appearance: none
            outline: none
            &:after {
                content url('../asserts/images/round.svg')
            }
            &:checked:after {
                content url('../asserts/images/done.svg')
            }
        }
        input[type=checkbox] {
            -webkit-appearance: none
        }
        .delete {
            position: absolute
            top: 0
            right: 10px
            bottom: 0
            width: 40px
            height: 40px
            margin: auto 0
            font-size: 30px
            color: #cc9a9a
            margin-bottom: 11px
            transition: color 0.2s ease-out
            background-color: transparent
            appearance: none
            border-width: 0
            cursor: pointer
            outline: none
        }
    }
</style>