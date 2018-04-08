import * as types from '../mutation-types';

// State
const state = {
	current_user: null,
}
// Getters
const getters = {
	getCurrentUser: state => {
		return state.current_user;
	},
}
// Mutations
const mutations = {
	[types.CURRENT_USER]: (state, user) => {
		state.current_user = user;
	},
}
// Actions
const actions = {
	fetchCurrentUser: ({ commit }, authorization_token) => {
		return new Promise((resolve, reject) => {
			var instance = axios.create();
			instance.defaults.headers.common['Authorization'] = authorization_token;
			instance.get('/api/user')
				.then(response => {
		            // console.log(response);
		            commit(types.CURRENT_USER, response.data.data);
		            resolve(response);
		        })
				.catch(error => {
		            // console.log(error);
		            reject(error);
		        });
		});
	},
	register: ({ commit }, user) => {
		return new Promise((resolve, reject) => {
			axios.post('/api/users', user)
			.then(response => {
	            // console.log(response);
	            resolve(response);
	        })
			.catch(error => {
	            // console.log(error);
	            reject(error);
	        });
		});
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}