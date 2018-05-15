import * as types from '../mutation-types';

// State
const state = {
	documentations: [],
	documentation: [],
	related_documentation: [],
	subject: []
}
// Getters
const getters = {
	getListDocumentation: state => {
		return state.documentations;
	},
	getSubject: state => {
		return state.subject;
	},
	getDetailDocumentation: state => {
		return state.documentation;
	},
	getRelatedDocumentation: state => {
		return state.related_documentation;
	}
}
// Mutations
const mutations = {
	[types.LIST_DOCUMENTATION]: (state, documentations) => {
		state.documentations = documentations;
	},
	[types.DETAIL_DOCUMENTATION]: (state, documentation) => {
		state.documentation= documentation;
	},
	[types.RELATED_DOCUMENTATION]: (state, related_documentation) => {
		state.related_documentation = related_documentation;
	},
	[types.LIST_SUBJECT]: (state, subject) => {
		state.subject = subject;
	},
	// [types.ADD_COMMENT]: (state, payload) => {
	// 	state.question.data.comments.push(payload.comment);
	// },
	// [types.EDIT_COMMENT]: (state, payload) => {
	// 	state.question.data.comments.splice(payload.indexComment, 1, payload.comment);
	// },
	// [types.DELETE_COMMENT]: (state, payload) => {
	// 	state.question.data.comments.splice(payload.indexComment, 1);
	// },
}
// Actions
const actions = {
	fetchListDocumentation: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.get('/api/documentations', { params: { sort: payload.sort, page: payload.page } })
			.then(response => {
	            if (response.data.hasOwnProperty('errors')) {
	            	commit(types.LIST_DOCUMENTATION, [])
	            }
	            else {
	            	commit(types.LIST_DOCUMENTATION, response.data);
	            }
	            resolve(response);
	        })
			.catch(error => {
	            reject(error);
	        });
		});

	},
	fetchListSubject: ({ commit }) => {
		return new Promise((resolve, reject) => {
			axios.get('/api/subjects')
			.then(response => {
	            if (response.data.hasOwnProperty('errors')) {
	            	commit(types.LIST_SUBJECT, [])
	            }
	            else {
	            	commit(types.LIST_SUBJECT, response.data);
	            }
	            resolve(response);
	        })
			.catch(error => {
	            reject(error);
	        });
		});

	},
	// fetchDetailDocumentation: ({ commit }, payload ) => {
	// 	return new Promise((resolve, reject) => {
	// 		axios.get('/api/questions/' + payload.id)
	// 		.then(response => {
	//             // console.log(response);
	//             if (response.data.hasOwnProperty('errors')) {
	//             	commit(types.DETAIL_QUESTION, [])
	//             }
	//             else {
	//             	commit(types.DETAIL_QUESTION, response.data);
	//             }
	//             resolve(response);
	//         })
	// 		.catch(error => {
	//             // console.log(error);
	//             reject(error);
	//         });
	// 	});

	// },
	// fetchRelatedDocumentation: ({ commit }, payload ) => {
	// 	return new Promise((resolve, reject) => {
	// 		axios.get('/api/questions/' + payload.id + '/related')
	// 		.then(response => {
	//             // console.log(response);
	//             if (response.data.hasOwnProperty('errors')) {
	//             	commit(types.RELATED_QUESTION, [])
	//             }
	//             else {
	//             	commit(types.RELATED_QUESTION, response.data);
	//             }
	//             resolve(response);
	//         })
	// 		.catch(error => {
	//             // console.log(error);
	//             reject(error);
	//         });
	// 	});

	// },
	// addComment: ({ commit }, payload ) => {
	// 	return new Promise((resolve, reject) => {
	// 		commit(types.ADD_COMMENT, payload);
	// 		resolve();
	// 	});

	// },
	// editComment: ({ commit }, payload ) => {
	// 	return new Promise((resolve, reject) => {
	// 		commit(types.EDIT_COMMENT, payload);
	// 		resolve();
	// 	});

	// },
	// deleteComment: ({ commit }, payload ) => {
	// 	return new Promise((resolve, reject) => {
	// 		commit(types.DELETE_COMMENT, payload);
	// 		resolve();
	// 	});

	// },
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}