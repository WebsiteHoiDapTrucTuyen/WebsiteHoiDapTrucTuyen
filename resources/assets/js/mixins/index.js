import Vue from 'vue';

export default new Vue.mixin ({
	computed: {
		isAuthenticated() {
			if (this.$auth.isAuthenticated()) {
				return true;
			}
			return false;
		},
		currentUser() {
			return this.$store.getters['user/getCurrentUser'].data
		},
	}
})