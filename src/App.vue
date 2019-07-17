<template>
    <div id="app">
        <div id="cover"></div>
        <Header/>
        <Todo/>
        <Footer/>
    </div>
</template>

<script>
    import Header from './layout/Header.vue'
    import Footer from './layout/Footer.vue'
    import Todo from './views/Todo.vue'

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