
export default [
    {
      path: '/',
      redirect: '/app'
    },
    {
        path: '/app',
        name: 'app',
        component: () => import('../views/todo/Todo.vue')
    },
    {
        path: '/login',
        component: () => import('../views/login/Login.vue')
    }
]