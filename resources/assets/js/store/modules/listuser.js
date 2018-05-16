import * as types from '../mutation-types';

// State
const state = {
	users: [],
}
// Getters
const getters = {
	getListUser: state => {
		return state.users;
	}
}
// Mutations
const mutations = {
	[types.LIST_USER]: (state, users) => {
		state.users = users;
	},
}
// Actions
const actions = {
	fetchListUser: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.get('/api/users', { params: { sort: payload.sort, page: payload.page } })
			.then(response => {
	            if (response.data.hasOwnProperty('errors')) {
	            	commit(types.LIST_USER, [])
	            }
	            else {
	            	commit(types.LIST_USER, response.data);
	            }
	            resolve(response);
	        })
			.catch(error => {
	            reject(error);
	        });
		});

	},
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}