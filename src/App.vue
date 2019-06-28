<template>
    <div id="app">
        <div id="cover"></div>
        <Header/>
        <Todo/>
        <Footer/>
    </div>
</template>

<script>
    import Header from './todo/Header.vue'
    import Footer from './todo/Footer.vue'
    import Todo from './todo/Todo.vue'

    export default {
        name: "App.vue",
        components: {Todo, Footer, Header},

    }
</script>

<style lang="stylus" scoped>
    #cover {
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        background-color whitesmoke
        opacity 0.2
        z-index -1
    }


</style>