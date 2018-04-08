import * as types from '../mutation-types';

// State
const state = {
	token: {
		token_type: null,
		expires_in: null,
		access_token: null,
		refresh_token: null
	},
}
// Getters
const getters = {
	getAuthorizationToken: state => {
		return state.token.token_type + ' ' + state.token.access_token;
	},
	isAuthenticated: state => {
		if (!state.token.access_token || !state.token.expires_in || (Date.now() > parseInt(state.token.expires_in))) {
			return false;
		}
		return true;
	},
}
// Mutations
const mutations = {
	[types.LOGIN]: (state, data) => {
		state.token.token_type = data.token_type;
		state.token.expires_in = Date.now() + data.expires_in;
		state.token.access_token = data.access_token;
		state.token.refresh_token = data.refresh_token;
	}
}
// Actions
const actions = {
	login: ({ commit }, data) => {
		return new Promise((resolve, reject) => {
			let oauth = {
				grant_type: 'password',
				client_id: 2,
				client_secret: 'ktgzB8qRzUTkYovTR2N2zLRuv8xz1C1ZS9VvtiqN',
				username: data.email,
				password: data.password
			};

			axios.post('/oauth/token', oauth)
			.then(response => {
	            // console.log(response);
	            commit(types.LOGIN,	 response.data);
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