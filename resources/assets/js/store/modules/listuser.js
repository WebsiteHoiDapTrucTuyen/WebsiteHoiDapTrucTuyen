import * as types from '../mutation-types';

// State
const state = {
	users: [],
	users_search: []
}
// Getters
const getters = {
	getListUser: state => {
		return state.users;
	},
	getUserSearch: state => {
		return state.users_search;
	}
}
// Mutations
const mutations = {
	[types.LIST_USER]: (state, users) => {
		state.users = users;
	},
	[types.SEARCH_USER]: (state, users_search) => {
		state.users_search = users_search;
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
	fetchSearchUser: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.get('/api/users', { params: { keyword: payload.data.keyword, page: payload.page} })
			.then(response => {
				//console.log(response);
	            if (response.data.hasOwnProperty('errors')) {
	            	
	            	commit(types.SEARCH_USER, [])
	            }
	            else {
	            	commit(types.SEARCH_USER, response.data);
	            }
	            resolve(response);
	        })
			.catch(error => {
	            // console.log(error);
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