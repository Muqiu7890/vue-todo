import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import createRouter from './router/router'
import './asserts/style/global.styl'

Vue.use(VueRouter)

const router = createRouter()

new Vue({
    router,
    render: (h) => h(App)
}).$mount('#main')