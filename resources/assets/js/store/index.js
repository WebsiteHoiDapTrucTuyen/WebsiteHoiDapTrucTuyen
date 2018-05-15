import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import question from './modules/question'
import asset from './modules/asset'
import answer from './modules/answer'
import comment from './modules/comment'
//
import documentation from './modules/documentation'

Vue.use(Vuex);

export default new Vuex.Store ({
	modules: {
		user,
		question,
		asset,
		answer,
		comment,
		documentation,
	},
	strict: true,
})