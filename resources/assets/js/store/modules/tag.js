import * as types from '../mutation-types';

// State
const state = {
	tags: [],
	tagsPure: [],
	tags_search: []
}
// Getters
const getters = {
	getListTag: state => {
		return state.tags;
	},
	getListTagPure: state => {
		return state.tagsPure;
	},
	getTagSearch: state => {
		return state.tags_search;
	}
}
// Mutations
const mutations = {
	[types.LIST_TAG]: (state, tags) => {
		state.tags = tags;
	},
	[types.LIST_TAG_PURE]: (state, tagsPure) => {
		state.tagsPure = tagsPure;
	},
	[types.ADD_TAG]: (state, tag) => {
		if (tag.data) {
			state.tagsPure.data.push(tag.data);
		}
	},
	[types.SEARCH_TAG]: (state, tags_search) => {
		state.tags_search = tags_search;
	},
}
// Actions
const actions = {
	fetchListTag: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.get('/api/tags', { params: { sort: payload.sort, page: payload.page } })
			.then(response => {
	            if (response.data.hasOwnProperty('errors')) {
	            	commit(types.LIST_TAG, [])
	            }
	            else {
	            	commit(types.LIST_TAG, response.data);
	            }
	            resolve(response);
	        })
			.catch(error => {
	            reject(error);
	        });
		});

	},
	fetchListTagPure: ({ commit }) => {
		return new Promise((resolve, reject) => {
			axios.get('/api/tags/pure')
			.then(response => {
	            if (response.data.hasOwnProperty('errors')) {
	            	commit(types.LIST_TAG_PURE, [])
	            }
	            else {
	            	commit(types.LIST_TAG_PURE, response.data);
	            }
	            resolve(response);
	        })
			.catch(error => {
	            reject(error);
	        });
		});

	},
	fetchStoreTag: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.post('/api/tags', payload.data)
			.then(response => {
	            // console.log(response);
	            if (response.data.hasOwnProperty('errors')) {
	            	commit(types.ADD_TAG, [])
	            }
	            else {
	            	commit(types.ADD_TAG, response.data);
	            }
	            resolve(response);
	        })
			.catch(error => {
	            // console.log(error);
	            reject(error);
	        });
		});
	},
	fetchSearchTag: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.get('/api/tags', { params: { keyword: payload.data.keyword, page: payload.page} })
			.then(response => {
				//console.log(response);
	            if (response.data.hasOwnProperty('errors')) {
	            	
	            	commit(types.SEARCH_TAG, [])
	            }
	            else {
	            	commit(types.SEARCH_TAG, response.data);
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