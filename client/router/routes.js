
export default [
    {
      path: '/',
      redirect: '/app'
    },
    {
        path: '/app',
        name: 'app',
        component: () => import('../views/todo/Todo.vue') // 使用动态导入作为代码分割点
    },
    {
        path: '/login',
        component: () => import('../views/login/Login.vue')
    }
]