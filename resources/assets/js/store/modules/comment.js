import * as types from '../mutation-types';

// State
const state = {
	
}
// Getters
const getters = {
	
}
// Mutations
const mutations = {
	
}
// Actions
const actions = {
	fetchStoreComment: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.post('/api/comments/' + payload.type + '/' + payload.id, payload.data)
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
	fetchUpdateComment: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.put('/api/comments/' + payload.id, payload.data)
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
	fetchDeleteComment: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.delete('/api/comments/' + payload.id)
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
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}