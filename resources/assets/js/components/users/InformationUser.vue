<template>
    <!--body-->
    <div class="container content-card" style="background-color: #FFFFFF;" v-if="user">
        <!--profile-->
        <div id="profile">
            <div class="row">
                <div class="col-lg-3 avatar">
                    <div class="card">
                        <img class="rounded-circle" :src="sourceImage(user.avatar)">
                        <div class="card-body">
                            <h4 class="card-title">{{ user.name }}</h4>
                            <div class="point">
                                <span class="oi oi-star"></span>
                                <span class="card-text">Điểm: {{ user.point_reputation }}</span>
                            </div>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <span class="oi oi-map-marker mr-2"></span>
                                <span>{{ user.location }}</span>
                            </li>
                            <li class="list-group-item">
                                <span class="oi oi-briefcase mr-2"></span>
                                <span>{{ user.job }}</span>
                            </li>
                        </ul>
                        <div class="card-body" v-if="checkOwner">
                            <router-link :to="{ name: 'edit-information-user', params: { id: user.id } }">Cập nhật</router-link>
                        </div>
                    </div>
                </div>
                <div class="col-lg-9">
                    <div class="about-text">
                        <div class="heder-about">
                            <div class="name">
                                <span>Hey, I'm</span>
                                <span>{{ user.name }}</span>
                            </div>
                            <div class="join float-right">
                                <span>Tham gia vào</span>
                                <span>{{ user.date.date | moment("DD-MM-YYYY") }}</span>
                            </div>
                        </div>
                        <div class="body-about">
                            <div class="title-about">
                                {{ user.status }}
                            </div>
                            <div class="about" v-html="user.about">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--/profile-->
        <component :is="component" :data="generateTopActivity()" @changeActivity="changeActivity($event)"></component>
    </div>
    <!--end body-->
</template>

<script>
    import TopActivity from './TopActivity.vue'
    import AllActivity from './AllActivity.vue'
    export default {
        components: {
            TopActivity: TopActivity,
            AllActivity: AllActivity
        },
        data() {
            return {
                component: 'TopActivity'
            }
        },
        computed: {
            user() {
                return this.$store.getters['user/getInformationUser'].data;
            },
            currentUser() {
                return this.$store.getters['user/getCurrentUser'].data
            },
            checkOwner() {
                return this.currentUser && this.user.id === this.currentUser.id
            },
        },
        methods: {
            sourceImage(url) {
                return "/images/avatar_users/" + url;
            },
            fetchInformationUser(id) {
                let payload = { 'id': id }
                this.$store.dispatch('user/fetchInformationUser', payload)
            },
            generateTopActivity() {
                let data = {
                    count_question: this.user.count_question,
                    count_answer: this.user.count_answer,
                    count_documentation: this.user.count_documentation,
                    top_question: this.user.top_question,
                    top_answer: this.user.top_answer,
                    top_documentation: this.user.top_documentation
                }
                return data
            },
            changeActivity(component) {
                this.component = component
            }
        },
        created() {
            this.fetchInformationUser(this.$route.params.id)
        },
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>
