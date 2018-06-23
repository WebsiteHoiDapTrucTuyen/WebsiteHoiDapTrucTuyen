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
	fetchVoteAction: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.post('/api/votes/' + payload.type + '/' + payload.id, payload.data)
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