
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router/router';
import store from './store/index';
import Auth from './packages/auth/Auth';
import tinymce from 'vue-tinymce-editor'

Vue.use(Auth)
Vue.component('tinymce', tinymce) 

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.guest)) {
		if (Vue.auth.isAuthenticated()) {
			next({ name: 'home' })
		}
		else {
			next()
		}
	}
	else {
		next()
	}
})

const app = new Vue({
    router,
    store,
}).$mount('#app');

// Vue.config.devtools = false
// Vue.config.debug = false
// Vue.config.silent = true
