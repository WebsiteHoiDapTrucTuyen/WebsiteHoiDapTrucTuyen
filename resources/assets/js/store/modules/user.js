import * as types from '../mutation-types';

// State
const state = {
	current_user: [],
	information_user: [],
	activity: []
}
// Getters
const getters = {
	getCurrentUser: state => {
		return state.current_user;
	},
	checkAuthenticated: state => {
		return !_.isEmpty(state.current_user);
	},
	getInformationUser: state => {
		return state.information_user;
	},
	getAllActivity: state => {
		return state.activity;
	}
}
// Mutations
const mutations = {
	[types.CURRENT_USER]: (state, user) => {
		if (user) {
			state.current_user = user;
		}
	},
	[types.INFORMATION_USER]: (state, information_user) => {
		if (information_user) {
			state.information_user = information_user;
		}
	},
	[types.ALL_ACTIVITY]: (state, activity) => {
		if (activity) {
			state.activity = activity;
		}
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
			axios.post('/api/register', payload.user)
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
	fetchInformationUser: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.get('/api/users/' + payload.id)
			.then(response => {
	            // console.log(response);
	            if (response.data.hasOwnProperty('errors')) {
	            	commit(types.INFORMATION_USER, [])
	            }
	            else {
	            	commit(types.INFORMATION_USER, response.data);
	            }
	            resolve(response);
	        })
			.catch(error => {
	            // console.log(error);
	            reject(error);
	        });
		});

	},
	fetchUpdateAvatar: ({ commit }, payload) => {
		return new Promise((resolve, reject) => {
			axios.put('/api/update-avatar', payload.data)
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
	fetchUpdateInformation: ({ commit }, payload) => {
		return new Promise((resolve, reject) => {
			axios.put('/api/update-information', payload.data)
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
	fetchUpdatePassword: ({ commit }, payload) => {
		return new Promise((resolve, reject) => {
			axios.put('/api/update-password', payload.data)
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
	fetchAllActivity: ({ commit }, payload) => {
		return new Promise((resolve, reject) => {
			axios.get('/api/users/' + payload.id + '/' + payload.type, { params: { page: payload.page } })
			.then(response => {
				// console.log(response);
				if (response.data.hasOwnProperty('errors')) {
	            	commit(types.ALL_ACTIVITY, [])
	            }
	            else {
	            	commit(types.ALL_ACTIVITY, response.data);
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