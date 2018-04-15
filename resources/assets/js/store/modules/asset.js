import * as types from '../mutation-types';

// State
const state = {
  informationQuestion: {},
  leaderboard: [],
  commonTag: []
}
// Getters
const getters = {
  getInformationQuestion: state => {
    return state.informationQuestion;
  },
  getLeaderboard: state => {
    return state.leaderboard;
  },
  getCommonTag: state => {
    return state.commonTag;
  },
}
// Mutations
const mutations = {
  [types.INFORMATION_QUESTION]: (state, informationQuestion) => {
    state.informationQuestion = informationQuestion.data;
  },
  [types.LEADERBOARD]: (state, leaderboard) => {
    state.leaderboard = leaderboard.data;
  },
  [types.COMMON_TAG]: (state, commonTag) => {
    state.commonTag = commonTag.data;
  }
}
// Actions
const actions = {
  fetchInformationQuestion: ({ commit }) => {
    return new Promise((resolve, reject) => {
      axios.get('/api/statistics/information-question')
      .then(response => {
              // console.log(response);
              commit(types.INFORMATION_QUESTION, response.data);
              resolve(response);
          })
      .catch(error => {
              // console.log(error);
              reject(error);
          });
    });

  },
  fetchLeaderboard: ({ commit }) => {
    return new Promise((resolve, reject) => {
      axios.get('/api/statistics/leaderboard')
      .then(response => {
              // console.log(response);
              commit(types.LEADERBOARD, response.data);
              resolve(response);
          })
      .catch(error => {
              // console.log(error);
              reject(error);
          });
    });

  },
  fetchCommonTag: ({ commit }) => {
    return new Promise((resolve, reject) => {
      axios.get('/api/statistics/common-tag')
      .then(response => {
              // console.log(response);
              commit(types.COMMON_TAG, response.data);
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