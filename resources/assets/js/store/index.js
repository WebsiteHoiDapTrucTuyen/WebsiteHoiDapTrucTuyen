import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import question from './modules/question'
import asset from './modules/asset'

Vue.use(Vuex);

export default new Vuex.Store ({
	modules: {
		user,
		question,
		asset
	},
	strict: true,
})