import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

import App from '../App.vue';
import Home from '../components/Home.vue';
import Login from '../components/auth/Login.vue';
import Register from '../components/auth/Register.vue'
import Question from '../components/questions/Question.vue'
import ListQuestion from '../components/questions/ListQuestion.vue'
import DetailQuestion from '../components/questions/DetailQuestion.vue'

//
import Document from '../components/documents/Document.vue';
import ListDocument from '../components/documents/ListDocument.vue';


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
                        },
                        {
                            path: ':id',
                            component: DetailQuestion,
                            name: 'detail-question'
                        }
                    ]
                },
                {
                    path: 'documents',
                    component: Document,
                    children:[
                        {
                            path:'',
                            component: ListDocument,
                            name: 'list-document'
                        }
                    ]
                }
            ]
        }
    ]
});

export default router;