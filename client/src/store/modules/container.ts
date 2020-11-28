import * as types from '../types';
import axios from 'axios';
const url = '/api/containers';

const state = {
    containersLocal: [],
    containers: []
}

const getters = {

    [types.GET_CONTAINER_LOCAL]: (state) => payload => {
        /**First we need to filter the containersLocal */
        const desireContainer = state.containersLocal.filter(item => {
            return item.fillContainer === payload.fillContainer
        });
        // delete payload.fillContainer;

        /**if we have more prop in the objects 
         * then we can use the list of then for
         * filtering and if not just return the list of the rows
         */
        if (desireContainer.length > 0) {
            if (payload.all) return desireContainer[0];
            var keyList = Object.keys(payload);
            keyList = keyList.filter(keyItem => keyItem !== 'fillContainer');
            var containerRows = desireContainer[0].Row || [];
            keyList.map(keyItem => {
                containerRows = containerRows.filter(containerItem => {
                    return containerItem[keyItem] === payload[keyItem];
                })
            })

            return containerRows;
        }
    }
}

const actions = {
    [types.FETCH_CONTAINER]: async ({ commit }, payload) => {
        try {
            console.log('fetching the data ', payload);
            const response = await axios.post(`${url}/fetch`, payload);
            if (response.data.container)
                commit(types.FETCH_CONTAINER, response.data.container);
        } catch (err) {
            console.log('some error happen in catching the container ', err);
        }
    },

    [types.ADD_CONTAINER]: async ({ commit }, payload) => {
        try {
            const response = await axios.post(url, payload);
            if (response.data.container) commit(types.ADD_CONTAINER, [response.data.container]);
        } catch (err) {
            console.log('this is the error  for adding the project ', err);
        }
    },
    [types.ADD_CONTAINER_LOCAL]: async ({ commit }, payload) => {
        commit(types.ADD_CONTAINER_LOCAL, payload);
    },
    [types.DELETE_CONTAINER_ROW]: async ({ commit }, payload) => {
        try {
            const response = await axios.delete(`${url}/${JSON.stringify(payload)}`);
            if (response.data.container) {
                commit(types.DELETE_CONTAINER_ROW, response.data.container);
            }
        } catch (err) {
            console.log('this is the error while deleting ', err);
        }
    }
}

const mutations = {
    [types.ADD_CONTAINER]: (state, payload) => {

        /**we need to check if this container exitst or not 
         * and if not just added other wise we need to add the
         * new row to the existing ones
         */
        console.log('this is adding the container payload in  ', payload, state.containersLocal);
        payload.map(item => {
            var containerExist = false;
            state.containersLocal.map(container => {
                console.log('this is the 1 ', container, item)
                if (item.fillContainer === container.fillContainer) {
                    console.log('this is the case dfd', item, container);
                    containerExist = true;
                    /**check if we do not have the row 
                     * and just want to change the other props 
                     * like the prop for showing or hidnig the modal
                     */
                    if (!item.Row) {
                        container = Object.assign(container, item);
                        state.containersLocal.push({ id: 'test' });
                        state.containersLocal.pop();
                        return;
                    }

                    item.Row.map(itemRow => {
                        var rowExist = false;
                        container.Row.map((containerRow, index) => {
                            if (containerRow.id === itemRow.id) {
                                rowExist = true;
                                containerRow = Object.assign(containerRow, itemRow);
                                if (itemRow.newIndex) {
                                    container.Row.splice(itemRow.newIndex, 0, container.Row.splice(index, 1)[0])
                                }
                            }
                        })
                        if (!rowExist) {
                            container.Row.push(itemRow);
                        }
                    })
                }
            })
            if (!containerExist) state.containersLocal.push(item);
        })
    },
    [types.FETCH_CONTAINER]: (state, container) => {
        console.log('this is fetching the container  ', container, state.containersLocal);
        container.map(item => {
            var containerExist = false;
            state.containersLocal.map(container => {
                if (item.fillContainer === container.fillContainer) {
                    containerExist = true;
                    /**check if we do not have the row 
                     * and just want to change the other props 
                     * like the prop for showing or hidnig the modal
                     */
                    if (!item.Row) {
                        container = Object.assign(container, item);
                        state.containersLocal.push({ id: 'test' });
                        state.containersLocal.pop();
                        return;
                    }
                    item.Row.map(itemRow => {
                        var rowExist = false;
                        container.Row.map((containerRow, index) => {
                            if (containerRow.id === itemRow.id) {
                                rowExist = true;
                                containerRow = Object.assign(containerRow, itemRow);
                                if (itemRow.newIndex) {
                                    container.Row.splice(itemRow.newIndex, 0, container.Row.splice(index, 1)[0])
                                }
                            }
                        })
                        if (!rowExist) {
                            container.Row.push(itemRow);
                        }
                    })
                }
            })
            if (!containerExist) state.containersLocal.push(item);
        })
        state.containersLocal.push({ id: 'trigger' });
        state.containersLocal.pop();
    },
    [types.ADD_CONTAINER_LOCAL]: (state, payload) => {

        /**we need to check if this container exitst or not 
         * and if not just added other wise we need to add the
         * new row to the existing ones
         */
        console.log('this is adding the container payload in  ', payload);
        payload.map(item => {
            var containerExist = false;
            state.containersLocal.map(container => {
                if (item.fillContainer === container.fillContainer) {
                    containerExist = true;
                    /**check if we do not have the row 
                     * and just want to change the other props 
                     * like the prop for showing or hidnig the modal
                     */
                    if (!item.Row) {
                        container = Object.assign(container, item);
                        state.containersLocal.push({ id: 'test' });
                        state.containersLocal.pop();
                        return;
                    }
                    item.Row.map(itemRow => {
                        var rowExist = false;
                        container.Row.map((containerRow, index) => {
                            if (containerRow.id === itemRow.id) {
                                rowExist = true;
                                containerRow = Object.assign(containerRow, itemRow);
                                if (itemRow.newIndex) {
                                    container.Row.splice(itemRow.newIndex, 0, container.Row.splice(index, 1)[0])
                                }
                            }
                        })
                        if (!rowExist) {
                            container.Row.push(itemRow);
                        }
                    })
                }
            })
            if (!containerExist) state.containersLocal.push(item);
        })
    },
    [types.DELETE_CONTAINER_ROW]: (state, payload) => {
        /**what we will recieved is the name of the container and 
         * rows that should be reomoved
         */
        if (!payload.fillContainer || !payload.Row) return;
        var desiredContainer = state.containersLocal.filter(container => container.fillContainer === payload.fillContainer);
        if (desiredContainer.length > 0) {
            payload.Row.map(row => {
                desiredContainer[0].Row = desiredContainer[0].Row.filter(containerRow => containerRow.id !== row.id);
            })
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}