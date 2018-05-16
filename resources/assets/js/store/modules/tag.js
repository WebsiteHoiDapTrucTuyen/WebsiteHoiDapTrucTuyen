import * as types from '../mutation-types';

// State
const state = {
	tags: [],
}
// Getters
const getters = {
	getListTag: state => {
		return state.tags;
	}
}
// Mutations
const mutations = {
	[types.LIST_TAG]: (state, tags) => {
		state.tags = tags;
	},
}
// Actions
const actions = {
	fetchListTag: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.get('/api/tags', { params: { sort: payload.sort, page: payload.page } })
			.then(response => {
	            if (response.data.hasOwnProperty('errors')) {
	            	commit(types.LIST_TAG, [])
	            }
	            else {
	            	commit(types.LIST_TAG, response.data);
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