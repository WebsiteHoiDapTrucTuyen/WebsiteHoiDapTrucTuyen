import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

import App from '../App.vue';
import Home from '../components/Home.vue';
import Login from '../components/auth/Login.vue';
import Register from '../components/auth/Register.vue'
import Question from '../components/questions/Question.vue'
import ListQuestion from '../components/questions/ListQuestion.vue'


const router = new VueRouter({
    mode: 'history',
    routes: [
        { 
            path: '/', 
            component: App, 
            children: [
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
                },
                {
                    path: 'questions',
                    component: Question,
                    children: [
                        {
                            path: '',
                            component: ListQuestion,
                            name: 'list-question'
                        }
                    ]
                }
            ]
        }
    ]
});

export default router;