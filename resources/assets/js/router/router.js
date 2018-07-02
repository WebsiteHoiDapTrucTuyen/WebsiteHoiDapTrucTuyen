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
import InformationUser from '../components/users/InformationUser.vue'
import EditInformationUser from '../components/users/EditInformationUser.vue'
//
import Document from '../components/documents/Document.vue';
import ListDocument from '../components/documents/ListDocument.vue';
import DetailDocument from '../components/documents/DetailDocument.vue';
import EditDocument from '../components/documents/EditDocument.vue';
import CreateDocument from '../components/documents/CreateDocument.vue';
import ResultSearchDocument from '../components/documents/ResultSearchDocument.vue';
//
import Tag from '../components/tags/Tag.vue';
import ListTag from '../components/tags/ListTag.vue';
import User from '../components/users/User.vue';
import ListUser from '../components/users/ListUser.vue';
import ResultSearchTag from '../components/tags/ResultSearchTag.vue';
import ResultSearchUser from '../components/users/ResultSearchUser.vue';
import About from '../components/about/About.vue';
import ResultSearchQuestion from '../components/questions/ResultSearchQuestion.vue';



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
                        {
                            path: '/question-search',
                            component: ResultSearchQuestion,
                            name: 'search-question'
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
                        {
                            path: ':id/edit',
                            component: EditDocument,
                            name: 'edit-document'
                        },
                        {
                            path: '/document-create',
                            component: CreateDocument,
                            name: 'create-document'
                        },
                        {
                            path: '/document-search',
                            component: ResultSearchDocument,
                            name: 'search-document'
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
                        },
                        {
                            path:'tag-search',
                            component: ResultSearchTag,
                            name: 'search-tag'
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
                        },
                        {
                            path: ':id',
                            component: InformationUser,
                            name: 'information-user'
                        },
                        {
                            path: ':id/edit',
                            component: EditInformationUser,
                            name: 'edit-information-user'
                        },
                        {
                            path: ':user-search',
                            component: ResultSearchUser,
                            name: 'search-user'
                        },
                    ]
                },
                {
                    path: 'about',
                    component: About,
                    name: 'about'
                },
            ]
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});

export default router;