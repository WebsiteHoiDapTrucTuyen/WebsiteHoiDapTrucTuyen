import * as types from '../mutation-types';

// State
const state = {
	current_user: [],
}
// Getters
const getters = {
	getCurrentUser: state => {
		return state.current_user;
	},
	checkAuthenticated: state => {
		return state.current_user ? true : false
	}
}
// Mutations
const mutations = {
	[types.CURRENT_USER]: (state, user) => {
		state.current_user = user;
	},
}
// Actions
const actions = {
	fetchCurrentUser: ({ commit }) => {
		return new Promise((resolve, reject) => {
			axios.get('/api/user')
			.then(response => {
	            // console.log(response);
	            if (response.data.hasOwnProperty('errors')) {
	            	commit(types.CURRENT_USER, [])
	            }
	            else {
	            	commit(types.CURRENT_USER, response.data);
	            }
	            resolve(response);
	        })
			.catch(error => {
	            // console.log(error);
	            reject(error);
	        });
		});
	},
	register: ({ commit }, payload) => {
		return new Promise((resolve, reject) => {
			axios.post('/api/users', payload.user)
			.then(response => {
	            // console.log(response);
	            resolve(response);
	        })
			.catch(error => {
	            // console.log(error);
	            reject(error);
	        });
		});
	},
	logout: ({ commit }) => {
		return new Promise((resolve, reject) => {
			axios.post('/api/logout')
			.then(response => {
	            // console.log(response);
            	commit(types.CURRENT_USER, [])	           
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