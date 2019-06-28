<template>
    <div class="todo-tab">
        <span class="left">{{count}} items left</span>
        <span class="tabs">
            <span v-for="state in states"
                  :key="state"
                  :class="[filterstate === state ? 'active' : '']"
                  @click="toggleFilter(state)">{{state}}
            </span>
        </span>
        <span class="clear" @click="clearAllCompleted">Clear completed</span>
    </div>
</template>

<script>
    export default {
        name: "TodoTab",
        props: {
            filterstate: {
                types: String,
                required: true,
            },
            todos: {
                types: Array,
                required: true,
            }
        },
        data() {
            return {
                states: ['all', 'active', 'completed']
            }
        },
        computed: {
            count() {
                return this.todos.filter(item => !item.completed).length
            }
        },
        methods: {
            toggleFilter(state) {

            },
            clearAllCompleted() {

            }
        }
    }
</script>

<style lang="stylus" scoped>
    .todo-tab {
        font-weight 100
        display flex
        justify-content space-between
        padding 5px 0
        line-height 30px
        background-color #ffffff
        font-size 14px
        font-smoothing: antialiased
    }

    .left, .clear, .tabs {
        padding 0 10px
        box-sizing border-box
    }

    .left, .clear {
        width 150px
    }

    .left {
        text-align left
    }

    .clear {
        text-align: right
        cursor pointer
    }

    .tabs {
        width 200px
        display flex
        justify-content space-around
        * {
            display inline-block
            padding 0 10px
            cursor pointer
            border 1px solid rgba(175, 47, 47, 0)
            &.active {
                border-color rgba(100, 100, 100, 0.3)
                border-radius 7px
            }
        }
    }
</style>