<template>
    <div id="app">
        <div id="cover"></div>
        <Header/>
        <transition name="fade">
            <router-view/>
        </transition>
        <Footer/>
    </div>
</template>

<script>
    import Header from './layout/Header.vue'
    import Footer from './layout/Footer.vue'
    // import Todo from './views/todo/Todo.vue'

    export default {
        name: "App.vue",
        metaInfo: {
            title: 'todo'
        },
        components: {Footer, Header},
    }
</script>

<style lang="stylus" scoped>
    .app {
        background-color whitesmoke
        opacity 0.2
    }


</style>