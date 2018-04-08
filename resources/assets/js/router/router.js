import Vue from 'vue';
import VueRouter from 'vue-router';
import Auth from '../packages/auth/Auth.js';

Vue.use(VueRouter)
Vue.use(Auth)

import App from '../App.vue';
import Home from '../components/Home.vue';
import Login from '../components/auth/Login.vue';
import Register from '../components/auth/Register.vue'

const router = new VueRouter({
    mode: 'history',
    routes: [
        { 
            path: '/', 
            component: App, 
            children:[
                {
                    path: '',
                    component: Home,
                    name: 'home'
                },
                {
                    path: '/login',
                    component: Login,
                    name: 'login',
                    meta: {
                        guest: true
                    }
                },
                {
                    path: 'register',
                    component: Register,
                    name: 'register',
                    meta: {
                        guest: true
                    }
                }
            ]
        }
    ]
});

export default router;