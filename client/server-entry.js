import createApp from './create-app'

// 此处context即为renderToString 回调函数中传入的 context 对象
export default (context) => {
    return new Promise((resolve, reject) => {
        let {url} = context;
        let {app, router} = createApp();
        router.push(url);

        // router回调函数  当所有异步请求完成之后就会触发
        router.onReady(() => {
            let matchedComponents = router.getMatchedComponents();
            if (!matchedComponents.length) {
                return reject({
                    code: 404,
                });
            }
            resolve(app);
        }, reject)
    })
}