import Vue from 'vue'
import Component from './function-natification'

const NotificationConstructor = Vue.extend(Component)

const instances = []
let seed = 1

const removeInstance = (instance) => {
    if (!instance) return
    let len = instances.length
    let index = instances.findIndex(inst => instance.id === inst.id)
    instances.splice(index, 1)
    if (len <= 1) return
    const removeHeight = instance.vm.height
    for (let i = index; i < len - 1; i++) {
        instances[i].verticalOffset = parseInt(instances[i].vm.verticalOffset) - removeHeight - 16
    }
}

const notify = (options) => {
    if (Vue.prototype.$isServer) return

    const {
        autoClose,
        ...rest
    } = options
    const instance = new NotificationConstructor({
        propsData: {
            ...rest
        },
        data: {
            autoClose: autoClose === undefined ? 3000 : autoClose
        }
    })

    const id = `notification_${seed++}`
    instance.id = id
    instance.vm = instance.$mount() //生成el对象 但还未插入dom中
    document.body.appendChild(instance.vm.$el)
    instance.vm.visible = true
    let verticalOffset = 0
    instances.forEach(item => {
        verticalOffset += item.$el.offsetHeight + 16
    })
    verticalOffset += 16
    instance.verticalOffset = verticalOffset
    instances.push(instance) //放入内存中
    // 当弹出框消失时，在dom中取掉该节点
    instance.vm.$on('closed', () => {
        removeInstance(instance)
        document.body.removeChild(instance.vm.$el)
        instance.vm.$destroy()
    })
    instance.vm.$on('close', () => {
        instance.vm.visible = false
    })

    return instance.vm
}

export default notify