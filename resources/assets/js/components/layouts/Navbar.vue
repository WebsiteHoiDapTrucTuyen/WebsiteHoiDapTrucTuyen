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
                        <div class="notification dropdown">
                            <div class="bell-notification" id="dropdownNotification" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-bell" aria-hidden="true"></i>
                                <span class="badge badge-danger">69</span>
                            </div>
                            <div class="dropdown-menu dropdown-menu-left" aria-labelledby="dropdownNotification">
                                <div class="more">
                                    <a href="">Đánh đấu tất cả là đã đọc</a>
                                </div>
                                <a class="item is-new">
                                    <div class="avatar">
                                        <img :src="sourceImage(currentUser.avatar)" class="rounded-circle" width="60" height="60">
                                    </div>
                                    <div class="content">
                                        <div class="title">
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, quis?
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, quis?
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, quis?
                                        </div>
                                        <div class="time">
                                            8 phút trước
                                        </div>
                                    </div>
                                    <div class="dismiss">
                                        <i class="fa fa-eye-slash" aria-hidden="true"></i>
                                    </div>
                                </a>
                                <a class="item">
                                    <div class="avatar">
                                        <img :src="sourceImage(currentUser.avatar)" class="rounded-circle" width="60" height="60">
                                    </div>
                                    <div class="content">
                                        <div class="title">
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, quis?
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, quis?
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, quis?
                                        </div>
                                        <div class="time">
                                            8 phút trước
                                        </div>
                                    </div>
                                    <div class="dismiss">
                                        <i class="fa fa-eye-slash" aria-hidden="true"></i>
                                    </div>
                                </a>
                                <a class="item">
                                    <div class="avatar">
                                        <img :src="sourceImage(currentUser.avatar)" class="rounded-circle" width="60" height="60">
                                    </div>
                                    <div class="content">
                                        <div class="title">
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, quis?
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, quis?
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, quis?
                                        </div>
                                        <div class="time">
                                            8 phút trước
                                        </div>
                                    </div>
                                    <div class="dismiss">
                                        <i class="fa fa-eye-slash" aria-hidden="true"></i>
                                    </div>
                                </a>
                                <a class="item is-new">
                                    <div class="avatar">
                                        <img :src="sourceImage(currentUser.avatar)" class="rounded-circle" width="60" height="60">
                                    </div>
                                    <div class="content">
                                        <div class="title">
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, quis?
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, quis?
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, quis?
                                        </div>
                                        <div class="time">
                                            8 phút trước
                                        </div>
                                    </div>
                                    <div class="dismiss">
                                        <i class="fa fa-eye-slash" aria-hidden="true"></i>
                                    </div>
                                </a>
                                <a class="item">
                                    <div class="avatar">
                                        <img :src="sourceImage(currentUser.avatar)" class="rounded-circle" width="60" height="60">
                                    </div>
                                    <div class="content">
                                        <div class="title">
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, quis?
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, quis?
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, quis?
                                        </div>
                                        <div class="time">
                                            8 phút trước
                                        </div>
                                    </div>
                                    <div class="dismiss">
                                        <i class="fa fa-eye-slash" aria-hidden="true"></i>
                                    </div>
                                </a>
                                <a class="item">
                                    <div class="avatar">
                                        <img :src="sourceImage(currentUser.avatar)" class="rounded-circle" width="60" height="60">
                                    </div>
                                    <div class="content">
                                        <div class="title">
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, quis?
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, quis?
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, quis?
                                        </div>
                                        <div class="time">
                                            8 phút trước
                                        </div>
                                    </div>
                                    <div class="dismiss">
                                        <i class="fa fa-eye-slash" aria-hidden="true"></i>
                                    </div>
                                </a>
                                <div class="more">
                                    <a href="">Xem thêm thông báo ...</a>
                                </div>
                            </div>
                        </div>
                        <!-- /notification -->
                        <div class="dropdown" v-if="currentUser">
                            <div class="avatar_login" id="dropdownMenuButton" data-toggle="dropdown">
                                <img :src="sourceImage(currentUser.avatar)" class="rounded-circle" >
                            </div>
                            <div class="dropdown-menu dropdown-menu-left" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item">
                                    <span class="oi oi-globe"></span>
                                    <span>Thông Báo</span>
                                    <span class="badge badge-primary">
                                        69 
                                    </span>
                                </a>
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
    this.$store.dispatch("user/fetchCurrentUser")
    .then(response => {

    })
    .catch(error => {

    });
  },
  mounted() {
    // console.log('Component mounted.')
  }
};
</script>
