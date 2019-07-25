<template>
    <header class='todo-header'>
        <h1>Todo</h1>
    </header>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style lang="stylus" scoped>
    /*嵌套写法*/
    .todo-header {
        text-align center
        h1 {
            font-size 100px
            font-style italic
            font-family 'Times New Roman', Times, serif
            color rgba(55, 94, 99, 0.5)
            font-weight 100
            margin 20px
        }
    }
</style>