import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import VueRouter from 'vue-router'
import createRouter from './router/router'
import createStore from './store/store'
import './asserts/style/global.styl'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

export default () => {
    return new Vue({
        router,
        store,
        render: (h) => h(App)
    }).$mount('#main')
}
