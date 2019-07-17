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
    .app {
        background-color whitesmoke
        opacity 0.2
    }


</style>