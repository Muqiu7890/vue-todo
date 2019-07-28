<template>
    <div id="app">
        <div id="cover"></div>
        <div id="loading" v-show="loading">
            <loading></loading>
        </div>
        <Header/>
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
        <Footer/>
    </div>
</template>

<script>
    import Header from './layout/Header.vue'
    import Footer from './layout/Footer.vue'
    import Loading from './components/loading/loading.vue'
    import {mapState} from "vuex"
    // import Todo from './views/todo/Todo.vue'

    export default {
        name: "App.vue",
        metaInfo: {
            title: 'todo'
        },
        components: {Footer, Header,Loading},
        computed: {
            ...mapState(['loading'])
        },
        // mounted() {
        //     this.$notify({
        //         content: 'todo',
        //         btn: 'close'
        //     })
        // },
        methods: {
            notify() {
                this.$notify({
                    content: 'todo',
                    btn: 'close'
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .app {
        background-color whitesmoke
        opacity 0.2
    }
    #loading {
        position fixed
        top 0
        right 0
        bottom 0
        left 0
        background-color rgba(255,255,255,.3)
        z-index 99
        display flex
        align-items center
        justify-content center
    }


</style>