import * as types from '../mutation-types';

// State
const state = {
	documentations: [],
	documentation: [],
	related_documentation: [],
	related_subject: [],
	subject: [],
	documentation_search:[]
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
	},
	getRelatedSubject: state => {
		return state.related_subject;
	},
	getDocumentationSearch: state => {
		return state.documentation_search;
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
	[types.RELATED_SUBJECT]: (state, related_subject) => {
		state.related_subject = related_subject;
	},
	[types.LIST_SUBJECT]: (state, subject) => {
		state.subject = subject;
	},
	[types.DELETE_DOCUMENTATION]: (state, payload) => {
		if (payload) {
			state.documentations.data = state.documentations.data.filter((item) => {
				return item.id !== payload.id
			})
		}
	},
	[types.ADD_COMMENT]: (state, payload) => {
		state.documentation.data.comments.push(payload.comment);
	},
	[types.EDIT_COMMENT]: (state, payload) => {
		state.documentation.data.comments.splice(payload.indexComment, 1, payload.comment);
	},
	[types.DELETE_COMMENT]: (state, payload) => {
		state.documentation.data.comments.splice(payload.indexComment, 1);
	},
	[types.SEARCH_DOCUMENTATION]: (state, documentation_search) => {
		state.documentation_search = documentation_search;
	},
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
	fetchRelatedDocumentation: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.get('/api/documentations/' + payload.id + '/related')
			.then(response => {
	            // console.log(response);
	            if (response.data.hasOwnProperty('errors')) {
	            	commit(types.RELATED_DOCUMENTATION, [])
	            }
	            else {
	            	commit(types.RELATED_DOCUMENTATION, response.data);
	            }
	            resolve(response);
	        })
			.catch(error => {
	            // console.log(error);
	            reject(error);
	        });
		});
	},
	fetchRelatedSubject: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.get('/api/documentations/' + payload.id + '/related-subject')
			.then(response => {
	            // console.log(response);
	            if (response.data.hasOwnProperty('errors')) {
	            	commit(types.RELATED_SUBJECT, [])
	            }
	            else {
	            	commit(types.RELATED_SUBJECT, response.data);
	            }
	            resolve(response);
	        })
			.catch(error => {
	            // console.log(error);
	            reject(error);
	        });
		});
	},
	fetchDetailDocumentation: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.get('/api/documentations/' + payload.id)
			.then(response => {
	            // console.log(response);
	            if (response.data.hasOwnProperty('errors')) {
	            	commit(types.DETAIL_DOCUMENTATION, [])
	            }
	            else {
	            	commit(types.DETAIL_DOCUMENTATION, response.data);
	            }
	            resolve(response);
	        })
			.catch(error => {
	            // console.log(error);
	            reject(error);
	        });
		});

	},
	fetchDeleteDocumentation: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.delete('/api/documentations/' + payload.id)
			.then(response => {
	            if (response.data.hasOwnProperty('errors')) {
	            	
	            }
	            else {
	            	let data = {
	            		'id': payload.id
	            	}
	            	commit(types.DELETE_DOCUMENTATION, data);
	            }
	            resolve(response);
	        })
			.catch(error => {
	            // console.log(error);
	            reject(error);
	        });
		});
	},
	fetchUpdateDocumentation: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.put('/api/documentations/' + payload.id, payload.data)
			.then(response => {
				//console.log(response);
	            if (response.data.hasOwnProperty('errors')) {
	            	
	            	//commit(types.UPDATE_DOCUMENTATION, [])
	            }
	            else {
	            	//commit(types.UPDATE_DOCUMENTATION, response.data);
	            }
	            resolve(response);
	        })
			.catch(error => {
	            // console.log(error);
	            reject(error);
	        });
		});
	},
	fetchCreateDocumentation: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.post('/api/documentations/', payload.data)
			.then(response => {
				//console.log(response);
	            if (response.data.hasOwnProperty('errors')) {
	            	
	            	//commit(types.UPDATE_DOCUMENTATION, [])
	            }
	            else {
	            	//commit(types.UPDATE_DOCUMENTATION, response.data);
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
	fetchSearchDocumentation: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.get('/api/search/documentations', { params: { keyword: payload.data.keyword, subject: payload.data.subject, tags: payload.data.tags, page: payload.page } })
			.then(response => {
				//console.log(response);
	            if (response.data.hasOwnProperty('errors')) {
	            	
	            	commit(types.SEARCH_DOCUMENTATION, [])
	            }
	            else {
	            	commit(types.SEARCH_DOCUMENTATION, response.data);
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