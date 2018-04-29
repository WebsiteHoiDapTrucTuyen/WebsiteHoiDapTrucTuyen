<template>
    <!--sign up-->
    <div class="container" style="background-color: #FFFFFF;">
        <div class="form-login-signup" >
            <h3 id="text-login">Đăng Ký <br> E-Learning</h3>
            <div class="border-login">
                <!--sign up gg fb-->
                <div id="border-gg-fb">
                    <a><img src="images/googlelg.png" alt=""></a>
                    <a><img src="images/fblg.png" alt=""></a>
                </div>
                <!--/sign up gg fb-->
                <br>
                <div v-if="message.errors" class="alert alert-danger">
                    {{ message.errors }}
                </div>
                <!--sign up main-->
                <form @submit.prevent="register">
                    <div class="form-group">
                        <label class="form-login">Tên Hiển Thị</label>
                        <input class="form-login form-control" :class="{ 'is-invalid': message.name }" type="text" name="name" placeholder="Jonh" v-model="name" required="">
                        <div v-if="message.name" class="invalid-feedback">
                          {{ message.name }}
                      </div>
                    </div>
                    <div class="form-group">
                        <label class="form-login">Email</label>
                        <input class="form-login form-control" :class="{ 'is-invalid': message.email }" type="email" name="email" placeholder="you@example.com" v-model="email" required="">
                        <div v-if="message.email" class="invalid-feedback">
                            {{ message.email }}
                        </div>
                    </div>
                    <div class="form-group ">
                        <label class="form-login">Mật Khẩu</label>
                        <input class="form-login form-control" :class="{ 'is-invalid': message.password }" type="password" name="password" placeholder="******" v-model="password" required="">
                        <div v-if="message.password" class="invalid-feedback">
                            {{ message.password }}
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-login">Nhập Lại Mật Khẩu</label>
                        <input class="form-login form-control" :class="{ 'is-invalid': message.confirm_password }" type="password" name="confirm_password" placeholder="******" v-model="confirm_password" required="">
                        <div v-if="message.confirm_password" class="invalid-feedback">
                            {{ message.confirm_password }}
                        </div>
                    </div>
                    <div id="btn-Signup">
                        <button class="btn colr policy">Đăng Ký</button>
                        <span class="policy">Bằng cách đăng ký, bạn đồng ý với chính sách bảo mật và điều khoản dịch vụ của chúng tôi.</span>
                    </div>
                </form>
                <!--/sign up main-->
            </div>
            <!--have acc-->
            <div class="border-login">
                <div id="dont-acc">
                    <span>Bạn đã có tài khoản ?</span>
                    <router-link :to="{ name: 'login' }">Đăng nhập ngay</router-link>
                </div>
            </div>
        </div>
    </div>
    <!--end sign up-->
</template>

<script>
    export default {
        data() {
            return {
                name: null,
                email: null,
                password: null,
                confirm_password: null,
                message: [],
            }
        },
        methods: {
            register() {
                let payload = {
                    'user': {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        confirm_password: this.confirm_password,   
                    }
                }
                // console.log(this.message)
                this.$store.dispatch('user/register', user)
                .then(response => {
                    if (response.data.hasOwnProperty('errors')) {
                        this.message['errors'] = 'Đăng ký không thành công';
                        this.password = null;
                        this.confirm_password = null;
                    }
                    else {
                        this.$router.push({ name: 'login' });    
                    }
                })
                .catch(error => {
                    // console.log(error);
                });
            },
            checkName(value) {
                if (value.length < 6 || value.length > 32) {
                    this.message['name'] = 'Tên hiển thị phải có độ dài từ 6 đến 32 ký tự';
                }
                else {
                    this.message['name'] = null;
                }
            },
            checkEmail(value){
                if (!(/^\w+([\.-]?\ w+)*@\w+([\.-]?\ w+)*(\.\w{2,3})+$/.test(value))) {
                    this.message['email'] = 'Email không hợp lệ';
                }
                else {
                    this.message['email'] = null;
                }
            },
            checkPassword(value) {
                if (value.length < 6 || value.length > 32) {
                    this.message['password'] = 'Mật khẩu phải có độ dài từ 6 đến 32 ký tự';
                }
                else {
                    this.message['password'] = null;
                }
            },
            checkConfirmPassword(value) {
                if (value.length < 6 || value.length > 32) {
                    this.message['confirm_password'] = 'Mật khẩu phải có độ dài từ 6 đến 32 ký tự';
                }
                else {
                    if (value != this.password) {
                        this.message['confirm_password'] = 'Xác nhận mật khẩu không trùng khớp';
                    }
                    else {
                        this.message['confirm_password'] = null;
                    }
                }
            }
        },
        watch: {
            name(value) {
                this.name = value;
                this.checkName(value);
            },
            email(value) {
                this.email = value;
                this.checkEmail(value);
            },
            password(value) {
                this.password = value;
                this.checkPassword(value);
            },
            confirm_password(value) {
                this.confirm_password = value;
                this.checkConfirmPassword(value);
            }
        },
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>
