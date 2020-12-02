import axios from 'axios'
import * as Vuex from 'vuex';
const url = 'api/users'
import { User } from '../../interface/user';


interface State {
  user: User,
  users: User[]
}

type Context = Vuex.ActionContext<State, State>


const state = {
  user: {},
  users: []
}

const getters = {
  allUsers: (state: State) => state.users
}

const actions = {
  fetchUsers: async ({ commit }) => {
    const response = await axios.get(url)
    commit('setUsers', response.data)
  },

  addUser: async ({ commit }, payload) => {
    const response = await axios.post(url, payload);
    commit('newUser', response.data.user)
  },
  async addUsers(context: Context, payload: User): Promise<void> {
    await new Promise((resolve, reject) => {
      const response = axios.post(url, payload);
      resolve(response);
    })
  },
  login: async ({ commit }, payload) => {
    try {
      const response = await axios.post(`${url}/login`, payload);
      if (response.data.user) commit('login', response.data.user)
    } catch (err) {
      // console.log('this is the error that we recieve in client side ', err)
    }
  }
}

const mutations = {
  setUsers: (state, users) => (state.users = users),
  newUser: (state, user) => {
    state.users.push(user);
  },
  login: (state, response) => {
    //  console.log('this is the login mutation ', response)
    state.user = response;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
