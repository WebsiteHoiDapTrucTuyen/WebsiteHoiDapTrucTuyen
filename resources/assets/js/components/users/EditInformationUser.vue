<template>
    <!--profile-->
    <div class="container content-card" style="background-color: #FFFFFF;" v-if="user">
        <!--edit profile-->
        <div v-if="message.errors" class="alert alert-danger">
            {{ message.errors }}
        </div>
        <div class="row">
            <div class="col-lg-4">
                <div>
                    <div class="edit-avatar">
                        <div class="edit-body">
                            <div class="edit-title">
                                Cập nhật ảnh đại diện
                            </div>
                            <div class="photo">
                                <img id="img_avatar" :src="sourceImage(user.avatar)" alt="" class="rounded-circle">
                            </div>
                            <div class="text">
                                <span class="text-muted">Ảnh đại diện sẽ được tự động cập nhật</span>
                            </div>
                            <div class="btn-upload">
                                <button type="button" class="btn btn-primary button-upload">
                                    <label for="upload-photo">Tải ảnh lên</label>
                                    <input type="file" name="avatar" id="upload-photo" @change="changeAvatar" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-8">
                <div class="edit-info">
                    <div class="head-title">
                        Cập nhật tài khoản
                    </div>
                    <div class="title-info">
                        Thông tin cá nhân
                    </div>
                    <div class="info">
                        <form @submit.prevent="editInformation">
                            <div class="form-group">
                                <label>Tên hiển thị:</label>
                                <input type="text" class="form-control" name="name" v-model="name" required>
                                <div v-if="message.name" class="invalid-feedback" style="display: block;">
                                    {{ message.name }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Biểu ngữ:</label>
                                <input type="text" class="form-control" name="status" v-model="status" required>
                                <div v-if="message.status" class="invalid-feedback" style="display: block;">
                                    {{ message.status }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Vị trí:</label>
                                <input type="text" class="form-control" name="location" v-model="location" required>
                                <div v-if="message.location" class="invalid-feedback" style="display: block;">
                                    {{ message.location }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Nghề nghiệp:</label>
                                <input type="text" class="form-control" name="job" v-model="job" required>
                                <div v-if="message.job" class="invalid-feedback" style="display: block;">
                                    {{ message.job }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Về bạn:</label>
                                <editor rows="10" api-key="jaghjq8xkau4fx4v7ct8j1y2pvughbdsgz57qkwotbooubbv" v-model="about" :init="config" ></editor>
                                <div v-if="message.about" class="invalid-feedback" style="display: block;">
                                    {{ message.about }}
                                </div>
                            </div>
                            <div class="btn-save-info">
                                <button class="btn btn-primary" type="submit">Cập nhật</button>
                            </div>
                        </form>
                    </div>
                    <div class="title-change-password">
                        Đổi mật khẩu
                    </div>
                    <div class="change-password">
                        <form @submit.prevent="changePassword">
                            <div class="form-group">
                                <label>Mật khẩu cũ:</label>
                                <input type="password" class="form-control" placeholder="******" required v-model="old_password">
                                <div v-if="message.old_password" class="invalid-feedback" style="display: block;">
                                    {{ message.old_password }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Mật khẩu mới:</label>
                                <input type="password" class="form-control" placeholder="******" required v-model="new_password">
                                <div v-if="message.new_password" class="invalid-feedback" style="display: block;">
                                    {{ message.new_password }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Nhập lại mật khẩu mới:</label>
                                <input type="password" class="form-control" placeholder="******" required v-model="confirm_new_password">
                                <div v-if="message.confirm_new_password" class="invalid-feedback" style="display: block;">
                                    {{ message.confirm_new_password }}
                                </div>
                            </div>
                            <div class="btn-save-pass">
                                <button class="btn btn-primary" type="submit">Đổi mật khẩu</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!--/edit profile-->
    </div>
    <!--end frofile-->
</template>

<script>
    import Editor from '@tinymce/tinymce-vue'
    export default {
        components: {
            Editor,
        },
        data() {
            return {
                name: '',
                status: '',
                location: '',
                job: '',
                about: '',
                old_password: '',
                new_password: '',
                confirm_new_password: '',
                message: {},
                config: {
                    selector: 'textarea.tinymce',
                    language_url: '../../js/vi_VN.js',
                    menubar: true,
                    plugins: [
                    'advlist autolink lists link image charmap print preview anchor textcolor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table contextmenu paste code help emoticons codesample'
                    ],
                    toolbar: 'insert | undo redo |  formatselect | fontsizeselect | codesample code | emoticons | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                },
            }
        },
        computed: {
            user() {
                return this.$store.getters['user/getInformationUser'].data;
            },
        },
        methods: {
            sourceImage(url) {
                return "/images/avatar_users/" + url;
            },
            fetchInformationUser(id) {
                let payload = { 'id': id }
                this.$store.dispatch('user/fetchInformationUser', payload)
                .then(response => {
                    if (response.data.hasOwnProperty('errors')) {
                        
                    }
                    else {
                        this.name = response.data.data.name
                        this.status = response.data.data.status
                        this.location = response.data.data.location
                        this.job = response.data.data.job
                        this.about = response.data.data.about
                    }
                })
            },
            fetchUpdateAvatar(avatar) {
                let payload = {
                    data: {
                        avatar: avatar
                    }
                }
                this.$store.dispatch('user/fetchUpdateAvatar', payload)
                .then(response => {
                    if (response.data.hasOwnProperty('errors')) {
                        this.message['errors'] = 'Không thể cập nhật. Vui lòng thử lại sau';
                    }
                    else {
                        this.$store.dispatch('user/fetchCurrentUser')
                        this.fetchInformationUser(this.$route.params.id)
                    }
                });
            },
            changeAvatar(event) {
                let image = event.target.files[0];
                let reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = event => {
                    this.fetchUpdateAvatar(event.target.result) 
                }
            },
            editInformation() {
                let payload = {
                    data: {
                        name: this.name,
                        status: this.status,
                        location: this.location,
                        job: this.job,
                        about: this.about
                    }
                }

                this.$store.dispatch('user/fetchUpdateInformation', payload)
                .then(response => {
                    if (response.data.hasOwnProperty('errors')) {
                        this.message['errors'] = 'Không thể cập nhật. Vui lòng thử lại sau';
                    }
                    else {
                        this.$router.push({ name: 'information-user', params: { id: this.user.id } });    
                    }
                })
                .catch(error => {
                    // console.log(error);
                });
            },
            changePassword() {
                let payload = {
                    data: {
                        old_password: this.old_password,
                        new_password: this.new_password
                    }
                }

                this.$store.dispatch('user/fetchUpdatePassword', payload)
                .then(response => {
                    if (response.data.hasOwnProperty('errors')) {
                        this.message['errors'] = 'Không thể cập nhật. Vui lòng thử lại sau';
                    }
                    else {
                        this.$auth.destroyToken();
                        this.$store.dispatch("user/logout");
                        this.$router.push({ name: "login" });    
                    }
                })
                .catch(error => {
                    // console.log(error);
                });
            },
            checkName(value) {
                if (value.length < 6 || value.length > 32) {
                    this.message['name'] = 'Tên hiển thị có độ dài từ 6 đến 32 ký tự';
                }
                else {
                    this.message['name'] = '';
                }
            },
            checkStatus(value) {
                if (value.length === 0) {
                    this.message['status'] = 'Bạn chưa nhập biểu ngữ';
                }
                else {
                    this.message['status'] = '';
                }
            },
            checkLocation(value) {
                if (value.length === 0) {
                    this.message['location'] = 'Bạn chưa nhập vị trí';
                }
                else {
                    this.message['location'] = '';
                }
            },
            checkJob(value) {
                if (value.length === 0) {
                    this.message['job'] = 'Bạn chưa nhập nghề nghiệp';
                }
                else {
                    this.message['job'] = '';
                }
            },
            checkAbout(value) {
                if (value.length === 0) {
                    this.message['about'] = 'Bạn chưa nhập thông tin Về bạn';
                }
                else {
                    this.message['about'] = '';
                }
            },
            checkOldPassword(value) {
                if (value.length < 6 || value.length > 32) {
                    this.message['old_password'] = 'Mật khẩu cũ phải có độ dài từ 6 đến 32 ký tự';
                }
                else {
                    this.message['old_password'] = '';
                }
            },
            checkNewPassword(value) {
                if (value.length < 6 || value.length > 32) {
                    this.message['new_password'] = 'Mật khẩu mới phải có độ dài từ 6 đến 32 ký tự';
                }
                else {
                    this.message['new_password'] = '';
                }
            },
            checkConfirmNewPassword(value) {
                if (value.length < 6 || value.length > 32) {
                    this.message['confirm_new_password'] = 'Mật khẩu phải có độ dài từ 6 đến 32 ký tự';
                }
                else {
                    if (value != this.new_password) {
                        this.message['confirm_new_password'] = 'Xác nhận mật khẩu mới không trùng khớp';
                    }
                    else {
                        this.message['confirm_new_password'] = '';
                    }
                }
            }
        },
        watch: {
            name(value) {
                this.name = value
                this.checkName(value)
            },
            status(value) {
                this.status = value
                this.checkStatus(value)
            },
            location(value) {
                this.status = value
                this.checkLocation(value)
            },
            job(value) {
                this.status = value
                this.checkJob(value)
            },
            about(value) {
                this.about = value
                this.checkAbout(value)
            },
            old_password(value) {
                this.old_password = value
                this.checkOldPassword(value)
            },
            new_password(value) {
                this.new_password = value
                this.checkNewPassword(value)
            },
            confirm_new_password(value) {
                this.confirm_new_password = value
                this.checkConfirmNewPassword(value)
            },
        },
        created() {
            this.fetchInformationUser(this.$route.params.id)
        },
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>
