import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import VueRouter from 'vue-router'
import createRouter from './router/router'
import createStore from './store/store'
import Meta from 'vue-meta'
import './asserts/style/global.styl'

Vue.use(VueRouter)
Vue.use(Meta)
Vue.use(Vuex)

export default () => {
    const router = createRouter()
    const store = createStore()

    const app = new Vue({
        router,
        store,
        render: (h) => h(App)
    })
    return {app, router, store}
}
