import * as types from '../types';

const state = {
    loaderInfo: [{ counter: 0 }]
}

const getters = {
    [types.GET_LOADER]: state => payload => {
        return state.loaderInfo[0];
    }
}

const actions = {
    [types.SET_LOADER]: ({ commit }, payload) => {
        commit(types.SET_LOADER, payload);
    }
}

const mutations = {
    [types.SET_LOADER]: (state, payload) => {
        state.loaderInfo[0] = Object.assign(state.loaderInfo[0], payload);
        state.loaderInfo.push({ id: 'test' });
        state.loaderInfo.pop();
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}