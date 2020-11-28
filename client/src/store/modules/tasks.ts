import axios from 'axios';
const url = 'api/tasks/';

const state = {
    tasks: [],
    task: {}
};

const getters = {
    allTasks: (state) => state.tasks,
    singleTask: (state) => state.task
};

const actions = {
    async fetchTasks({ commit }) {
        const response = await axios.get(url);
        commit('setTasks', response.data);
    },
    async addTask({ commit }, payload) {
        const response = await axios.post(url, payload);
        commit('newTask', response.data);
    },
    async removeTask({ commit }, payload) {
        const response = await axios.delete(`${url}${payload}`);
        commit('removeTask', response.data);
    },
    async updateTask({ commit }, payload) {
        const response = await axios.put(url, payload);
        commit('updaeTask', response.data);
    },
    selectTask({ commit }, payload) {
        commit('selectTask ', payload);
    }

};

const mutations = {
    setTasks: (state, tasks) => state.tasks = tasks,
    newTask: (state, task) => state.tasks.push(task),
    removeTask: (state, _id) => state.tasks = state.tasks.filter(task => {
        return task._id !== _id;
    }),
    updateTask: (state, uptask) => {
        const index = state.tasks.findIndex(task => {
            return task._id === uptask._id;
        })

        if (index > -1) {
            state.tasks.splice(index, 1, uptask);
        }
    },
    selectTask: (state, task) => {
        state.task = task;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}