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
                    <form action="" method="GET">
                        <div class="input-group stylish-input-group mr-sm-5">
                            <input type="text" class="form-control" placeholder="Nhập từ khóa cần tìm" name="keyword">
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
                    <div v-else>
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
    }
  },
  created() {
    this.$store.dispatch("user/fetchCurrentUser");
  },
  mounted() {
    // console.log('Component mounted.')
  }
};
</script>
