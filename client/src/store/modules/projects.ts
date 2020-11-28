import axios from 'axios';
import { IProject } from '../../interface/project'
const url = 'api/projects';
import * as types from '../types';


const state = {
    project: {},
    projects: []
}

const getters = {
    [types.GET_PROJECT]: (state) => state.projects,
    singleProject: (state) => Object.assign({}, state.project)
}
const actions = {
    setProject: ({ commit }, payload) => {
        state.project = payload

    },
    [types.CREATE_PROJECT]: async ({ commit }, payload) => {
        // try {
        //     const response = await axios.post(url, payload);
        //     if (response.data.project) commit([types.CREATE_PROJECT], response.data.project);
        // } catch (err) {
        //     console.log('this is the error  for adding the project ', err);
        // }
        //getting data from the local storage while we are wating fro the data from the server
        commit(types.CREATE_PROJECT, payload);

    },
    fetchProjects: async ({ commit }) => {
        try {
            const response = await axios.get(url);
            if (response.data.projects) commit('fetchProjects', response.data.projects);
        } catch (err) {
            // console.log('this is the error for getting the projects ', err);
        }
    },
    updateProject: async ({ commit }, payload) => {
        try {
            const response = await axios.put(`${url}/${payload.id}`, payload);
            if (response.data.project) commit('updateProject', response.data.project);
        } catch (err) {
            // console.log('this is the error for updating the project ', err);
        }
    },
    deleteProject: async ({ commit }, payload) => {
        try {
            const response = await axios.delete(`${url}/${payload}`);
            if (response.data.project) commit('deleteProject', response.data.project)
        }
        catch (err) {
            // console.log('this is the error we redieved for deleting the project ', err);
        }
    }
}

const mutations = {
    [types.CREATE_PROJECT]: (state, project) => {
        state.projects.push(project);
    },
    fetchProjects: (state, projects) => {
        state.projects = projects;
    },
    updateProject: (state, project) => {
        /**we need to find the projec in the list and just update it with new props data */
        /**find the index of the project to be updated */
        const index = state.projects.findIndex(porjectitem => { return porjectitem.id === project.id });
        /**remove the item from array and insert the new update instead 
         * and we can see tne new wiil be reflect in the dom */
        state.projects.splice(index, 1, project);
    },
    deleteProject: (state, project) => {
        state.projects = state.projects.filter(projectItem => {
            return projectItem.id !== project.id
        })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}