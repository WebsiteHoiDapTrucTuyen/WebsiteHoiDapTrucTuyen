import * as types from '../mutation-types';

// State
const state = {
	answers: [],
}
// Getters
const getters = {
	getListAnswer: state => {
		return state.answers;
	},
}
// Mutations
const mutations = {
	[types.LIST_ANSWER]: (state, answers) => {
		state.answers = answers;
	},
	[types.ADD_COMMENT]: (state, payload) => {
		state.answers.data[payload.index].comments.push(payload.comment);
	},
	[types.EDIT_COMMENT]: (state, payload) => {
		state.answers.data[payload.indexAnswer].comments.splice(payload.indexComment, 1, payload.comment);
	},
}
// Actions
const actions = {
	fetchListAnswer: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.get('/api/answers/' + payload.id, { params: { page: payload.page } })
			.then(response => {
	            // console.log(response);
	            if (response.data.hasOwnProperty('errors')) {
	            	commit(types.LIST_ANSWER, [])
	            }
	            else {
	            	commit(types.LIST_ANSWER, response.data);
	            }
	            resolve(response);
	        })
			.catch(error => {
	            // console.log(error);
	            reject(error);
	        });
		});

	},
	addComment: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			commit(types.ADD_COMMENT, payload);
		});

	},
	editComment: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			commit(types.EDIT_COMMENT, payload);
			resolve();
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