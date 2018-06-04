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
import CreateQuestion from '../components/questions/CreateQuestion.vue'
import EditQuestion from '../components/questions/EditQuestion.vue'

//
import Document from '../components/documents/Document.vue';
import ListDocument from '../components/documents/ListDocument.vue';
import DetailDocument from '../components/documents/DetailDocument.vue';
//
import Tag from '../components/tags/Tag.vue';
import ListTag from '../components/tags/ListTag.vue';
import User from '../components/users/User.vue';
import ListUser from '../components/users/ListUser.vue';


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
                        },
                        {
                            path: '/questions-create',
                            component: CreateQuestion,
                            name: 'create-question'
                        },
                        {
                            path: ':id/edit',
                            component: EditQuestion,
                            name: 'edit-question'
                        },
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
                        },
                        {
                            path: ':id',
                            component: DetailDocument,
                            name: 'detail-document'
                        },
                    ]
                },
                {
                    path: 'tags',
                    component: Tag,
                    children:[
                        {
                            path:'',
                            component: ListTag,
                            name: 'list-tag'
                        }
                    ]
                },
                {
                    path: 'users',
                    component: User,
                    children:[
                        {
                            path:'',
                            component: ListUser,
                            name: 'list-user'
                        }
                    ]
                },
            ]
        }
    ]
});

export default router;