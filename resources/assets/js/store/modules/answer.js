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
		state.answers.data[payload.indexAnswer].comments.push(payload.comment);
	},
	[types.EDIT_COMMENT]: (state, payload) => {
		state.answers.data[payload.indexAnswer].comments.splice(payload.indexComment, 1, payload.comment);
	},
	[types.DELETE_COMMENT]: (state, payload) => {
		state.answers.data[payload.indexAnswer].comments.splice(payload.indexComment, 1);
	},
	[types.ADD_ANSWER]: (state, payload) => {
		if (payload.data) {
			state.answers.data.push(payload.data);			
		}
	},
	[types.EDIT_ANSWER]: (state, payload) => {
		if (payload.data) {
			state.answers.data.splice(payload.index, 1, payload.data);			
		}
	},
	[types.DELETE_ANSWER]: (state, payload) => {
		if (payload) {
			state.answers.data.splice(payload.index, 1);			
		}
	},
	[types.BEST_ANSWER]: (state, payload) => {
		if (payload) {
			for (let index = 0; index < state.answers.data.length; index++) {
				const element = state.answers.data[index];
				if (element['id'] === payload.id && !payload.isBestAnswer) {
					element['best_answer'] = true
				}
				else {
					element['best_answer'] = false
				}
			}		
		}
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
	fetchVoteAnswer: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.get('/api/answers/' + payload.id + '/show')
			.then(response => {
	            // console.log(response);
	            if (response.data.hasOwnProperty('errors')) {
	            	commit(types.EDIT_ANSWER, [])
	            }
	            else {
					let answer = {
						data: response.data.data,
						index: payload.index,
					}
	            	commit(types.EDIT_ANSWER, answer);
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
	deleteComment: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			commit(types.DELETE_COMMENT, payload);
			resolve();
		});

	},
	fetchStoreAnswer: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.post('/api/answers/' + payload.id, payload.data)
			.then(response => {
	            // console.log(response);
	            if (response.data.hasOwnProperty('errors')) {
	            	commit(types.ADD_ANSWER, [])
	            }
	            else {
	            	commit(types.ADD_ANSWER, response.data);
	            }
	            resolve(response);
	        })
			.catch(error => {
	            // console.log(error);
	            reject(error);
	        });
		});
	},
	fetchUpdateAnswer: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.put('/api/answers/' + payload.id, payload.data)
			.then(response => {
	            // console.log(response);
	            if (response.data.hasOwnProperty('errors')) {
	            	commit(types.EDIT_ANSWER, [])
	            }
	            else {
	            	let data = {
	            		'data': response.data.data,
	            		'index': payload.index
	            	}
	            	commit(types.EDIT_ANSWER, data);
	            }
	            resolve(response);
	        })
			.catch(error => {
	            // console.log(error);
	            reject(error);
	        });
		});
	},
	fetchDeleteAnswer: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.delete('/api/answers/' + payload.id)
			.then(response => {
	            // console.log(response);
	            if (response.data.hasOwnProperty('errors')) {
	            	
	            }
	            else {
	            	let data = {
	            		'index': payload.index
	            	}
	            	commit(types.DELETE_ANSWER, data);
	            }
	            resolve(response);
	        })
			.catch(error => {
	            // console.log(error);
	            reject(error);
	        });
		});
	},
	fetchBestAnswer: ({ commit }, payload) => {
		return new Promise((resolve, reject) => {
			axios.put('/api/answers/' + payload.id + '/bestAnswer')
			.then(response => {
	            // console.log(response);
	            if (response.data.hasOwnProperty('errors')) {
	            	
	            }
	            else {
	            	commit(types.BEST_ANSWER, payload);
	            }
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