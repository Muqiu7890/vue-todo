import Router from 'vue-router'
import routes from './routes'

export default () => {
    return new Router({
        routes,
        mode: 'history',
        linkActiveClass: 'active-link',
        linkExactActiveClass: 'exact-active-link',
        scrollBehavior(to,from,savedPosition) {
            if(savedPosition) {
                return savedPosition
            } else {
                return {x: 0,y: 0}
            }
        },
        fallback: true
    })
}