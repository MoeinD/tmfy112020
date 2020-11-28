import axios from 'axios';
const url = 'api/sidebar';


const state = {
    sidebarList: []
}

const getters = {
    getSidebar: (state, payload) => { return state.sidebarList }
}

const actions = {
    async fetchSidebar({ commit }, payload) {
        const response = await axios.post(url, payload);
        commit('setSidebar', response.data);
    }
}

const mutations = {
    setSidebar: (state, result) => {
        state.sidebarList = result.sidebar
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}