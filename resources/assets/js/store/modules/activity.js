import * as types from '../mutation-types';

// State
const state = {
	activities: [],
	countNewActivity: 0
}
// Getters
const getters = {
    getListActivity: state => {
        return state.activities;
	},
	getCountNewActiviy: state => {
		return state.countNewActivity;
	}
}
// Mutations
const mutations = {
    [types.LIST_ACTIVITY]: (state, activities) => {
		if (state.activities.data) {
			state.activities.data = state.activities.data.concat(activities.data);
			state.activities.meta = activities.meta;
		}
		else {
			state.activities = activities;
		}
    },
    [types.DISMISS_ALL_ACTIVITY]: (state, isSuccess) => {
        if (isSuccess) {
            state.activities.data.map(activity => {
                activity.is_new = false;
                return activity;
			})
			state.countNewActivity = 0
        }
    },
    [types.DISMISS_ACTIVITY]: (state, id) => {
        if (id) {
            state.activities.data.map(activity => {
                if (activity.id === id) {
                    activity.is_new = false;
                    return activity;
                }
                else {
                    return activity;
                }
			})
			state.countNewActivity = state.countNewActivity - 1;
        }
	},
	[types.COUNT_NEW_ACTIVITY]: (state, data) => {
		state.countNewActivity = data.data.countNew;
	},
	[types.ADD_ACTIVITY]: (state, activity) => {
		state.activities.data.pop();
		state.activities.data.unshift(activity);

		state.countNewActivity = state.countNewActivity + 1;
	},
}
// Actions
const actions = {
	fetchListActivity: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.get('/api/activities', { params: { page: payload.page } })
			.then(response => {
                // console.log(response);
                if (response.data.hasOwnProperty('errors')) {
	            	commit(types.LIST_ACTIVITY, [])
	            }
	            else {
	            	commit(types.LIST_ACTIVITY, response.data);
	            }
	            resolve(response);
	        })
			.catch(error => {
	            // console.log(error);
	            reject(error);
	        });
		});
	},
	fetchCountNewActivity: ({ commit } ) => {
		return new Promise((resolve, reject) => {
			axios.get('/api/activities/countNew')
			.then(response => {
				// console.log(response);
				if (response.data.hasOwnProperty('errors')) {
	            	commit(types.COUNT_NEW_ACTIVITY, [])
	            }
	            else {
	            	commit(types.COUNT_NEW_ACTIVITY, response.data);
	            }
	            resolve(response);
	        })
			.catch(error => {
	            // console.log(error);
	            reject(error);
	        });
		});
    },
    fetchDismissAllActivity: ({ commit } ) => {
		return new Promise((resolve, reject) => {
			axios.put('/api/activities/dismissAll')
			.then(response => {
                // console.log(response);
                if (response.data.hasOwnProperty('errors')) {
	            	commit(types.DISMISS_ALL_ACTIVITY, [])
	            }
	            else {
	            	commit(types.DISMISS_ALL_ACTIVITY, true);
	            }
	            resolve(response);
	        })
			.catch(error => {
	            // console.log(error);
	            reject(error);
	        });
		});
    },
    fetchDismissActivity: ({ commit }, payload ) => {
		return new Promise((resolve, reject) => {
			axios.put('/api/activities/' + payload.id + '/dismiss')
			.then(response => {
                // console.log(response);
                if (response.data.hasOwnProperty('errors')) {
	            	commit(types.DISMISS_ACTIVITY, [])
	            }
	            else {
	            	commit(types.DISMISS_ACTIVITY, payload.id);
	            }
	            resolve(response);
	        })
			.catch(error => {
	            // console.log(error);
	            reject(error);
	        });
		});
	},
	addActivity:({ commit }, payload) => {
		return new Promise((resolve, reject) => {
			commit(types.ADD_ACTIVITY, payload.data);
			resolve();
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