import * as types from '../types';

const state = {
    componentList: [],
    fullSize: false,
    showModal: false,
    modalInfo: [{}]
}

const getters = {
    [types.GET_MODAL_STATE]: state => state.modalInfo[0],
    getModal: (state) => state.componentList,
    getFullSize: (state) => state.fullSize
}

const actions = {
    [types.TOGGLE_MODAL]: ({ commit }, payload) => {
        commit(types.TOGGLE_MODAL, payload);
    },
    addModal: ({ commit }, payload) => {
        commit('addModal', payload);
    },
    closeModal: ({ commit }, payload) => {
        commit('closeModal', payload);

    },
    toggleFullSize: ({ commit }, payload) => {
        commit('toggleFullSize', payload);
    },
    toggleMinimize: ({ commit }, payload) => {
        commit('toggleMinimize', payload);
    }
}

const mutations = {
    [types.TOGGLE_MODAL]: (state, payload) => {
        state.modalInfo[0] = Object.assign(state.modalInfo[0], payload);
        //triggering the dom to show the last changes
        state.modalInfo.push({ id: 'test' });
        state.modalInfo.pop();
    },
    addModal: (state, modal) => state.componentList.push(modal),
    closeModal: (state, modalId) => {
        if (state.fullSize) state.fullSize = false;
        state.componentList = state.componentList.filter(component => {
            return component.id !== modalId;
        });
    },
    toggleFullSize: (state, modalId) => {
        state.fullSize = !state.fullSize;
        state.componentList.map(component => {
            if (component.id === modalId) {
                component.fullSize = !component.fullSize;
            }
        })
    },
    toggleMinimize: (state, modalId) => {
        state.componentList.map(component => {
            if (component.id == modalId) {
                if (component.fullSize) {
                    component.fullSize = false;
                    state.fullSize = false;
                }

                component.minimized = !component.minimized;
            }
        })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}