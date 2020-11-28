import axios from 'axios';
const jsonplaceholderUrl = 'https://jsonplaceholder.typicode.com/todos';

const state = {
    todos: [{
        id: 1,
        title: 'first do'
    }, {
        id: 2,
        title: 'second do'
    }]
};

const getters = {
    allTodos: (state) => state.todos
};

const actions = {
    async fetchTodos({ commit }) {
        const response = await axios.get(jsonplaceholderUrl);
        commit('setTodos', response.data);
    }
};

const mutations = {
    setTodos: (state, todos) => (state.todos = todos)
};

export default {
    state,
    getters,
    actions,
    mutations
}