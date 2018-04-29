export default function	(Vue) {
	Vue.auth = {
		setToken(token, expiration) {
			localStorage.setItem('token', token);
			localStorage.setItem('expiration', expiration);
			// set token for authorization header
			this.setAuthorizationHeader()
		},
		getToken() {
			var token = localStorage.getItem('token');
			var expiration = localStorage.getItem('expiration');

			if (!token || !expiration) {
				return null;
			}
			if (Date.now() > parseInt(expiration)) {
				this.destroyToken();
				return null
			}
			return token;
		},
		destroyToken() {
			localStorage.removeItem('token');
			localStorage.removeItem('expiration');
		},
		setAuthorizationHeader() {
			axios.defaults.headers.common['Authorization'] = this.getToken()
		},
		isAuthenticated() {
			if (this.getToken()) {
				return true;
			}
			return false;
		},
	}

	Object.defineProperties(Vue.prototype, {
		$auth: {
			get() {
				return Vue.auth;
			}
		}
	})
}