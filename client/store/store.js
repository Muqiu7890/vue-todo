import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
    const store = new Vuex.Store({
        strict: isDev,
        state: defaultState,
        mutations,
        getters,
        actions
    })
    // vuex的热更替功能
    if (module.hot) {
        module.hot.accept([
            './state/state',
            './mutations/mutations',
            './getters/getters',
            './actions/actions'
        ], () => {
            const newState = require('./state/state').default
            const newMutations = require('./mutations/mutations').default
            const newGetters = require('./getters/getters').default
            const newActions = require('./actions/actions').default

            store.hotUpdate({
                state: newState,
                mutations: newMutations,
                getter: newGetters,
                actions: newActions
            })
        })
    }
    return store
}
