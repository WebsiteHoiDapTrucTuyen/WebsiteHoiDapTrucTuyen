<template>
    <!-- Content -->
    <div class="content">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="main-content">
                        <div class="content-card">
                            <div class="note-content">
                                <h1 style="text-align: center;">Chỉnh sửa câu hỏi</h1>
                                <br>
                                <div v-if="message.errors" class="alert alert-danger">
                                    {{ message.errors }}
                                </div>
                                <form @submit.prevent="editQuestion">
                                    <div class="form-group">
                                        <label>Tiêu Đề</label>
                                        <input type="text" class="form-control" placeholder="Nhập tiêu đề câu hỏi" name="title" required="" v-model="title">
                                        <div v-if="message.title" class="invalid-feedback" style="display: block;">
                                            {{ message.title }}
                                        </div>
                                        <small class="form-text text-muted">Tiêu đề phải dễ hình dung về vấn đề cần giải quết</small>
                                    </div>
                                    <div class="form-group">
                                        <label>Nội Dung</label>
                                        <editor rows="10" api-key="jaghjq8xkau4fx4v7ct8j1y2pvughbdsgz57qkwotbooubbv" v-model="content" :init="config"></editor>
                                        <div v-if="message.content" class="invalid-feedback" style="display: block;">
                                            {{ message.content }}
                                        </div>
                                    </div>
                                    <div class="form-group" v-if="optionTags">
                                        <label>Thẻ</label>
                                        <multiselect v-model="selectedTags" :options="optionTags"
                                        placeholder="Nhập thẻ liên quan" label="name" track-by="name" 
                                        :multiple="true"
                                        :taggable="true"
                                        @tag="addTag"
                                        tag-placeholder="Thêm thẻ mới"
                                        @input="updateTags"
                                        :close-on-select="false" required></multiselect>
                                        <div v-if="message.tags" class="invalid-feedback" style="display: block;">
                                            {{ message.tags }}
                                        </div>
                                        <small class="form-text text-muted">Thẻ liên quan giúp mọi người quan tâm đến lĩnh vực đó hỗ trợ bạn tốt hơn (từ 1 đến 5 thẻ)</small>
                                    </div>
                                    <button type="submit" class="btn btn-primary btn-lg" >Chỉnh sửa câu hỏi</button>
                                </form>
                                <br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- end Content -->
</template>

<script>
    import Editor from '@tinymce/tinymce-vue'
    import Multiselect from 'vue-multiselect'

    export default {
        components: {
            Editor,
            Multiselect,
        },
        data() {
            return {
                title: '',
                content: '',
                tags: '',
                selectedTags: [],
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
            optionTags() {
                return this.$store.getters['tag/getListTagPure'].data;
            },
        },
        methods: {
            editQuestion() {
                let payload = {
                    'id': this.$route.params.id,
                    'data': {
                        'title': this.title,
                        'content': this.content,
                        'tags': this.tags,  
                    }
                }

                this.$store.dispatch('question/fetchUpdateQuestion', payload)
                .then(response => {
                    if (response.data.hasOwnProperty('errors')) {
                        this.message['errors'] = 'Không thể tạo câu hỏi mới. Vui lòng thử lại sau';
                    }
                    else {
                        this.$router.push({ name: 'detail-question', params: { id: response.data.data.id } });    
                    }
                })
                .catch(error => {
                    console.log(error);
                });
                
            },
            fetchListTagPure() {
                this.$store.dispatch('tag/fetchListTagPure');
            },
            addTag(name) {
                let payload = {
                    'data': {
                        'name': name
                    }
                }
                this.$store.dispatch('tag/fetchStoreTag', payload)
                    .then(response => {
                        if (response.data.hasOwnProperty('errors')) {
                            this.message['errors'] = 'Không thể thêm thẻ mới. Vui lòng thử lại sau';
                        }
                        else {
                            this.selectedTags.push(response.data.data)
                        }
                    });
            },
            getStringIdSelectedTags(tags) {
                let result = '';
                for(let tag of tags) {
                    result += ',' + tag.id;
                }
                result = result.substring(1)
                return result
            },
            updateTags(value) {
                this.tags = this.getStringIdSelectedTags(value)
            },
            checkTitle(value) {
                if (value.length < 16 || value.length > 256) {
                    this.message['title'] = 'Tiêu đề phải có độ dài từ 16 đến 256 ký tự';
                }
                else {
                    this.message['title'] = '';
                }
            },
            checkContent(value) {
                if (value.length < 64) {
                    this.message['content'] = 'Nội dung phải có ít nhất 64 ký tự (bao gồm cả định dạng)';
                }
                else {
                    this.message['content'] = '';
                }
            },
            checkTags(value) {
                let tags = value.split(',');
                if (!value || tags.length > 5) {
                    this.message['tags'] = 'Chỉ được nhập từ 1 đến 5 thẻ liên quan';
                }
                else {
                    this.message['tags'] = '';
                }
            },
            fetchDetailQuestion(id) {
                let payload = { 'id': id }
                this.$store.dispatch('question/fetchDetailQuestion', payload)
                .then(response => {
                    if (response.data.hasOwnProperty('errors')) {
                        this.message['errors'] = 'Không thể tải câu hỏi. Vui lòng thử lại sau';
                    }
                    else {
                        this.title = response.data.data.title   
                        this.content = response.data.data.content
                        this.selectedTags = response.data.data.tags 
                        this.tags = this.getStringIdSelectedTags(this.selectedTags)
                    }
                    
                })
            },
        },
        watch: {
            title(value) {
                this.title = value
                this.checkTitle(value)
            },
            content(value) {
                this.content = value
                this.checkContent(value)
            },
            tags(value) {
                this.tags = value
                this.checkTags(value)
            }
        },
        created() {
            this.fetchListTagPure();
            this.fetchDetailQuestion(this.$route.params.id);
        },
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

