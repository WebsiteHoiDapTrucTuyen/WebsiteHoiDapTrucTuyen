import * as types from '../mutation-types';

// State
const state = {
	questions: [],
	question: [],
	related_question: []
}
// Getters
const getters = {
	getListQuestion: state => {
		return state.questions;
	},
	getDetailQuestion: state => {
		return state.question;
	},
	getRelatedQuestion: state => {
		return state.related_question;
	}
}
// Mutations
const mutations = {
	[types.LIST_QUESTION]: (state, questions) => {
		state.questions = questions;
	},
	[types.DETAIL_QUESTION]: (state, question) => {
		state.question = question;
	},
	[types.RELATED_QUESTION]: (state, related_question) => {
		state.related_question = related_question;
	},
	[types.ADD_COMMENT]: (state, payload) => {
		state.question.data.comments.push(payload.comment);
	},
	[types.EDIT_COMMENT]: (state, payload) => {
		state.question.data.comments.splice(payload.indexComment, 1, payload.comment);
	},
	[types.DELETE_COMMENT]: (state, payload) => {
		state.question.data.comments.splice(payload.indexComment, 1);
	},
	[types.ADD_QUESTION]: (state, question) => {
		if (question.data) {
			state.questions.data.unshift(question.data);
		}
	},
	[types.UPDATE_QUESTION]: (state, question) => {
		if (question.data) {
			state.questions.data = state.questions.data.filter((item) => {
				return item.id === question.data.id ? question.data : item
			})
		}
	},
	[types.DELETE_QUESTION]: (state, payload) => {
		if (payload) {
			state.questions.data = state.questions.data.filter((item) => {
				return item.id !== payload.id
			})
		}
	},
}
// Actions
const actions = {
	fetchListQuestion: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.get('/api/questions', { params: { sort: payload.sort, page: payload.page } })
			.then(response => {
	            // console.log(response);
	            if (response.data.hasOwnProperty('errors')) {
	            	commit(types.LIST_QUESTION, [])
	            }
	            else {
	            	commit(types.LIST_QUESTION, response.data);
	            }
	            resolve(response);
	        })
			.catch(error => {
	            // console.log(error);
	            reject(error);
	        });
		});

	},
	fetchDetailQuestion: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.get('/api/questions/' + payload.id)
			.then(response => {
	            // console.log(response);
	            if (response.data.hasOwnProperty('errors')) {
	            	commit(types.DETAIL_QUESTION, [])
	            }
	            else {
	            	commit(types.DETAIL_QUESTION, response.data);
	            }
	            resolve(response);
	        })
			.catch(error => {
	            // console.log(error);
	            reject(error);
	        });
		});

	},
	fetchRelatedQuestion: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.get('/api/questions/' + payload.id + '/related')
			.then(response => {
	            // console.log(response);
	            if (response.data.hasOwnProperty('errors')) {
	            	commit(types.RELATED_QUESTION, [])
	            }
	            else {
	            	commit(types.RELATED_QUESTION, response.data);
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
			resolve();
		});

	},
	editComment: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			commit(types.EDIT_COMMENT, payload);
			resolve();
		});

	},
	deleteComment: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			commit(types.DELETE_COMMENT, payload);
			resolve();
		});

	},
	fetchStoreQuestion: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.post('/api/questions/', payload.data)
			.then(response => {
	            // console.log(response);
	            if (response.data.hasOwnProperty('errors')) {
	            	commit(types.ADD_QUESTION, [])
	            }
	            else {
	            	commit(types.ADD_QUESTION, response.data);
	            }
	            resolve(response);
	        })
			.catch(error => {
	            // console.log(error);
	            reject(error);
	        });
		});
	},
	fetchUpdateQuestion: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.put('/api/questions/' + payload.id, payload.data)
			.then(response => {
	            if (response.data.hasOwnProperty('errors')) {
	            	commit(types.UPDATE_QUESTION, [])
	            }
	            else {
	            	commit(types.UPDATE_QUESTION, response.data);
	            }
	            resolve(response);
	        })
			.catch(error => {
	            // console.log(error);
	            reject(error);
	        });
		});
	},
	fetchDeleteQuestion: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.delete('/api/questions/' + payload.id)
			.then(response => {
	            // console.log(response);
	            if (response.data.hasOwnProperty('errors')) {
	            	
	            }
	            else {
	            	let data = {
	            		'id': payload.id
	            	}
	            	commit(types.DELETE_QUESTION, data);
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