import * as types from '../types';

const state = {
    commonInformation: [{}]
}

const getters = {
    [types.GET_COMMON_INFORMATION]: (state) => payload => {
        return state.commonInformation[0];
    }
}

const actions = {
    [types.SET_COMMON_INFORMATION]: ({ commit }, payload) => {
        commit(types.SET_COMMON_INFORMATION, payload);
    }
}

const mutations = {
    [types.SET_COMMON_INFORMATION]: (state, payload) => {
        state.commonInformation[0] = Object.assign(state.commonInformation[0], payload);
        /**triggering the DOM */
        state.commonInformation.push({ id: 'test' });
        state.commonInformation.pop();
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}