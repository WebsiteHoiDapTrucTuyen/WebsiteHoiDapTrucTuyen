import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import question from './modules/question'
import asset from './modules/asset'
import answer from './modules/answer'
import comment from './modules/comment'
import vote from './modules/vote'
//
import documentation from './modules/documentation'
import tag from './modules/tag'
import listuser from './modules/listuser'

Vue.use(Vuex);

export default new Vuex.Store ({
	modules: {
		user,
		question,
		asset,
		answer,
		comment,
		vote,
		documentation,
		tag,
		listuser,
	},
	strict: true,
})