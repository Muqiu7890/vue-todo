import createApp from './create-app'

// 此处context即为renderToString 回调函数中传入的 context 对象
export default (context) => {
    return new Promise((resolve, reject) => {
        let {app, router, store} = createApp();
        let {url, user} = context;
        if (user) {
            store.commit('user',user)
        }
        router.push(url);
        // router回调函数  当所有异步请求完成之后就会触发
        router.onReady(() => {
            let matchedComponents = router.getMatchedComponents();
            if (!matchedComponents.length) {
                return reject({
                    code: 404,
                });
            }
            Promise.all(matchedComponents.map(Component => {
                if (Component.asyncData) {
                    return Component.asyncData({
                        route: router.currentRoute,
                        router,
                        store
                    })
                }
            })).then(data => {
                context.meta = app.$meta()
                context.state = store.state
                context.router = router
                resolve(app);
            })
        }, reject)
    })
}