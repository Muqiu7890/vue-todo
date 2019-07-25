    module.exports = (isDev) => {
    return {
        preserveWhitepace: true, // 清除文本换行等情况空格
        extractCSS: !isDev, // 把.vue的css提取到单独的文件 生产环境需要
    }
}