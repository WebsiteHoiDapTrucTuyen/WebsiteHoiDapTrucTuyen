import * as types from '../mutation-types';

// State
const state = {
	questions: []
}
// Getters
const getters = {
	getListQuestion: state => {
		return state.questions;
	},
}
// Mutations
const mutations = {
	[types.LIST_QUESTION]: (state, questions) => {
		state.questions = questions;
	}
}
// Actions
const actions = {
	fetchListQuestion: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.get('/api/questions', { params: { sort: payload.sort, page: payload.page } })
			.then(response => {
	            // console.log(response);
	            commit(types.LIST_QUESTION,	response.data);
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