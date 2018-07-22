<template>
    <!--login-->
    <div class="container" style="background-color: #FFFFFF;">
        <div class="form-login-signup" >
            <h3 id="text-login">Đăng Nhập <br> E-Learning</h3>
            <div class="border-login">
                <!--login gg fb-->
                <div id="border-gg-fb">
                    <a><img src="/images/googlelg.png" alt=""></a>
                    <a><img src="/images/fblg.png" alt=""></a>
                </div>
                <!--/login gg fb-->
                <br>
                <div v-if="message" class="alert alert-danger">
                    {{ message }}
                </div>
                <!--login main-->
                <form @submit.prevent="login">
                    <div class="form-group">
                        <label class="form-login">Email</label>
                        <input class="form-login form-control" type="email" name="email" placeholder="you@example.com" v-model="email" required>
                    </div>
                    <div class="form-group ">
                        <label class="form-login">Mật Khẩu</label>
                        <input class="form-login form-control" type="password" name="password" placeholder="******" v-model="password" required>
                    </div>
                    <div id="btnlogin">
                        <button class="btn colr">Đăng Nhập</button>
                        <a>Quên mật khẩu ?</a>
                    </div>
                </form>
                <!--/login main-->
            </div>
            <!--dont acc-->
            <div class="border-login">
                <div id="dont-acc">
                    <span>Bạn chưa có tài khoản ?</span>
                    <a>Đăng ký ngay</a>
                </div>
            </div>
        </div>
    </div>
    <!--end login-->
</template>

<script>
    export default {
        data() {
            return {
                email: null,
                password: null,
                message: null
            }
        },
        methods:{
            login() {
                var oauth = {
                    grant_type: 'password',
                    client_id: 2,
                    client_secret: 'WcvtGSQVG563uTIGADI4oOnGuEWyGsDrjJ5fViVm',
                    username: this.email,
                    password: this.password
                };

                axios.post('/oauth/token', oauth)
                .then(response => {
                    // console.log(response);
                    this.$auth.setToken(response.data.token_type + ' ' + response.data.access_token, (+response.data.expires_in * 1000) + Date.now());
                    this.fetchCurrentUser();
                    this.$router.push({ name: 'home' });
                })
                .catch(error => {
                    // console.log(error);
                    this.message = 'Tài khoản hoặc mật khẩu không chính xác'
                    this.email = ''
                    this.password = ''
                });
            },
            fetchCurrentUser() {
                this.$store.dispatch("user/fetchCurrentUser")
                .then(response => {
                    this.fetchListActivity();
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
                    if (!response.data.hasOwnProperty('errors')) {
                        this.countNew = response.data.data.countNew;
                    }
                })
                .catch(error => {
                    

                });
            },
        },
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>
