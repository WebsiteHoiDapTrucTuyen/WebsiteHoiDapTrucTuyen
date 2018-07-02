<template>
    <!--navbar-->
    <div class="container">
        <nav class="navbar fixed-top navbar-expand-lg navbar-light" style="background-color: #FFFFFF;">
            <!--brand-->
            <router-link :to="{ name: 'home' }" class="navbar-brand">
                <img class="img-responsive mr-sm-5" src="/images/elearning-logo.png" width="150" height="50" alt=" ">
            </router-link>
            <!--/brand-->
            <!--button-->
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <!--/button-->
            <!--nav-->
            <div class="collapse navbar-collapse row" id="navbarNav">
                <!--danh mục-->
                <ul class="navbar-nav">
                    <li class="nav-item mr-sm-3">
                        <router-link :to="{ name: 'list-question' }" class="nav-link"><strong>Câu Hỏi</strong></router-link>
                    </li>
                    <li class="nav-item mr-sm-3">
                        <router-link :to="{ name: 'list-document' }" class="nav-link"><strong>Tài Liệu</strong></router-link>
                    </li>
                    <li class="nav-item mr-sm-3">
                        <router-link :to="{ name: 'list-tag' }" class="nav-link"><strong>Thẻ</strong></router-link>
                    </li>
                    <li class="nav-item mr-sm-3">
                        <router-link :to="{ name: 'list-user' }" class="nav-link"><strong>Người Dùng</strong></router-link>
                    </li>
                    <li class="nav-item mr-sm-3">
                        <router-link :to="{ name: 'about' }" class="nav-link"><strong>Giới Thiệu</strong></router-link>
                    </li>
                </ul>
                <!--/danh mục-->
                <!--search box-->
                <div class="col-lg-4">
                    <form @submit.prevent="searchQuestion">
                        <div class="input-group stylish-input-group mr-sm-5">
                            <input :style="styleObject" type="text" class="form-control" :placeholder="placeholder" v-model="keyword">
                            <span class="input-group-addon">
                                <button type="submit">
                                    <span class="oi oi-magnifying-glass"></span>
                                </button>
                            </span>
                        </div>
                    </form>
                </div>
                <!--/search box-->
                <div class="ml-auto" style="padding-right: 10px;">
                    <div v-if="!currentUser">
                        <router-link :to="{ name: 'login' }"><button type="button" class="btn mr-3">Đăng Nhập</button></router-link>
                        <router-link :to="{ name: 'register' }"><button type="button" class="btn colr">Đăng Ký</button></router-link>
                    </div>
                    <div v-else class="auth">
                        <!-- notification -->
                        <div class="notification dropdown" v-if="activities && pagination">
                            <div class="bell-notification" id="dropdownNotification" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-bell" aria-hidden="true"></i>
                                <span v-if="countNew" class="badge badge-danger">{{ countNew }}</span>
                            </div>
                            <div class="dropdown-menu dropdown-menu-left" aria-labelledby="dropdownNotification">
                                <div class="more" @click.stop="dismissAll()">
                                    <a>Đánh đấu tất cả là đã đọc</a>
                                </div>
                                <div class="list-item">
                                    <a v-for="activity in activities" :key="activity.id" class="item" :class="{'is-new': activity.is_new}"
                                    @click="selectActivity(activity)">
                                        <div class="avatar">
                                            <img :src="sourceImage(activity.user_related.avatar)" class="rounded-circle" width="60" height="60">
                                        </div>
                                        <div class="content">
                                            <div class="title" v-html="generateContent(activity)">
                                                
                                            </div>
                                            <div class="time">
                                                {{ activity.date.date | moment("from", "now") }}
                                            </div>
                                        </div>
                                        <div class="dismiss">
                                            <i class="fa fa-eye-slash" aria-hidden="true" @click.stop="dismiss(activity.id)"></i>
                                        </div>
                                    </a>
                                </div>
                                <div v-if="page < pagination.last_page" class="more" @click.stop="showMore()">
                                    <a>Xem thêm thông báo ...</a>
                                </div>
                            </div>
                        </div>
                        <!-- /notification -->
                        <div class="dropdown" v-if="currentUser">
                            <div class="avatar_login" id="dropdownMenuButton" data-toggle="dropdown">
                                <img :src="sourceImage(currentUser.avatar)" class="rounded-circle" >
                            </div>
                            <div class="dropdown-menu dropdown-menu-left" aria-labelledby="dropdownMenuButton">
                                <router-link class="dropdown-item" :to="{ name: 'information-user', params: { id: currentUser.id }}">
                                    <span class="oi oi-person"></span>
                                    <span>Thông Tin Cá Nhân</span>
                                </router-link>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" @click="logout">
                                    <span class="oi oi-power-standby"></span>
                                    <span>Đăng Xuất</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--/nav-->
        </nav>
    </div>
    <!--/navbar-->
</template>

<script>
export default {
    data() {
        return {
            page: 1,
            keyword: '',
            tags:'',
            placeholder:'Nhập từ khóa cần tìm',
            styleObject: {
                 'border-color': '',
            },
        }
    },
    computed: {
        currentUser() {
        return this.$store.getters["user/getCurrentUser"].data;
        },
        activities() {
            return this.$store.getters["activity/getListActivity"].data;
        },
        pagination() {
            return this.$store.getters["activity/getListActivity"].meta;
        },
        countNew() {
            return this.$store.getters["activity/getCountNewActiviy"];
        }
    },
    methods: {
        sourceImage(url) {
        return "/images/avatar_users/" + url;
        },
        logout() {
        this.$auth.destroyToken();
        this.$store.dispatch("user/logout");
        this.$router.push({ name: "home" });
        },
        fetchCurrentUser() {
            this.$store.dispatch("user/fetchCurrentUser")
            .then(response => {
                this.fetchListActivity();
                this.receiveActivityBroadcast(this.currentUser.id);
            })
            .catch(error => {

            });
        },
        fetchListActivity(page = 1) {
            let payload = {
                page: page
            }
            this.$store.dispatch('activity/fetchListActivity', payload)
            .then(response => {
                this.fetchCountNewActivity();
            })
            .catch(error => {
                

            });
        },
        fetchCountNewActivity() {
            this.$store.dispatch('activity/fetchCountNewActivity')
            .then(response => {

            })
            .catch(error => {
                

            });
        },
        generateContent(activity) {
            return `<strong>${activity.user_related.name}</strong> ${activity.content} <strong>${activity.object.title}`;
        },
        dismiss(id) {
            this.fetchDismissActivity(id);
        },
        fetchDismissActivity(id) {
            let payload = {
                id: id
            }
            this.$store.dispatch('activity/fetchDismissActivity', payload)
            .then(response => {

            })
            .catch(error => {
                

            });
        },
        dismissAll() {
            this.fetchDismissAllActivity();
        },
        fetchDismissAllActivity() {
            this.$store.dispatch('activity/fetchDismissAllActivity')
            .then(response => {

            })
            .catch(error => {
                

            });
        },
        showMore() {
            this.fetchListActivity(++this.page);
            console.log(this.page);
            
        },
        receiveActivityBroadcast(user_id) {
            Echo.channel(`activities.${user_id}`)
            .listen('ActivityBroadcast', e => {
                this.addActivity(e);
            });
        },
        addActivity(data) {
            let payload = {
                data: data.activity
            }
            this.$store.dispatch('activity/addActivity', payload)
        },
        generateLink(type) {
            switch (type) {
                case 1:
                    return 'detail-question';
                    break;
                case 2:
                    return 'detail-document';
                    break;
            
                default:
                    break;
            }
        },
        selectActivity(activity) {
            // event.target.click();
            this.fetchDismissActivity(activity.id);
            this.$router.push({ name: this.generateLink(activity.object_type), params: { id: activity.object.id } });
        },
        searchQuestion() {
            let payload = {
            
                'keyword': this.keyword,
                'tags': this.tags,
            }

            if(this.keyword.length == 0){
                this.placeholder = 'Bạn chưa nhập key search!';
                this.styleObject = 'border-color:red';
            }
            else{
                this.styleObject = 'border-color:#CCCBCB';
                this.$router.push({ name: 'search-question', params: { payload }}); 
                this.placeholder = 'Nhập từ khóa cần tìm';
                this.keyword = '';   
            }
        },
    },
    created() {
        this.fetchCurrentUser();
    },
    mounted() {
        // console.log('Component mounted.')
    }
};
</script>
