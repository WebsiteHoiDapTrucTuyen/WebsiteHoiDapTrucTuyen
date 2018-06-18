<template>
	<div class="content">
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<div class="main-content">
						<div class="content-card">
							<div class="note-content">
								<h1 style="text-align: center;">Tạo mới tài liệu</h1>
								<br>
	                                <div v-if="message.errors" class="alert alert-warning">
	                                	{{ message.errors }}
	                               	</div>
								<form @submit.prevent="editDocumentation">
									<div class="form-group">
										<label>Chủ Đề</label>
                                        <select class="form-control" v-model="subject">
                                            <option :value="0">--- Chủ đề ---</option>
                                            <option v-for="subjectpure in optionSubject" :value="subjectpure.id">{{ subjectpure.name }}</option>
                                        </select>
									</div>
									<div class="form-group">
										<label>Tiêu Đề</label>
										<input type="text" class="form-control" placeholder="Nhập tiêu đề câu hỏi" v-model='title'>
                                        <div v-if="message.title" class="invalid-feedback" style="display: block;">
                                            {{ message.title }}
                                        </div>
									</div>
                                    <div class="form-group">
                                        <label>Tóm Tắt</label>
                                        <input type="text" class="form-control" placeholder="Nhập tóm tắt câu hỏi" v-model='summary'>
                                        <div v-if="message.summary" class="invalid-feedback" style="display: block;">
                                            {{ message.summary }}
                                        </div>
                                    </div>
									<div class="form-group">
										<label>Nội Dung</label>
                                        <editor rows="10" api-key="jaghjq8xkau4fx4v7ct8j1y2pvughbdsgz57qkwotbooubbv" v-model="content" :init="config"></editor>
                                        <div v-if="message.content" class="invalid-feedback" style="display: block;">
                                            {{ message.content }}
                                        </div>
									</div>
									<div class="form-group">
										<label>Link</label>
										<input type="url" class="form-control" placeholder="Dán đường link để tải tài liệu" v-model='link'>
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
										<small class="form-text text-muted">Thẻ liên quan giúp mọi người quan tâm đến lĩnh vực đó hỗ trợ bạn tốt hơn</small>
									</div>
									<button type="submit" class="btn btn-primary btn-lg"> <span class="oi oi-task"></span> Tạo tài liệu</button>
								</form>
								<br>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
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
                summary: '',
                subject: 0,
                content: '',
                tags: '',
                selectedTags: [],
                message: {},
                link: '',
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
            optionSubject(){
                return this.$store.getters['documentation/getSubject'].data;
            },
            optionTags() {
                return this.$store.getters['tag/getListTagPure'].data;
            },
        },
        methods: {
            editDocumentation() {
                let payload = {
                    'id': this.$route.params.id,
                    'data': {
                        'subject': this.subject,
                        'title': this.title,
                        'summary': this.summary,
                        'content': this.content,
                        'link': this.link,
                        'tags': this.tags,  
                    }
                }

                this.$store.dispatch('documentation/fetchCreateDocumentation', payload)
                .then(response => {
                    if (response.data.hasOwnProperty('errors')) {
                        this.message['errors'] = 'Không thể tạo tài liệu mới. Vui lòng thử lại sau';
                    }
                    else {
                        this.$router.push({ name: 'detail-document', params: { id: response.data.data.id } });    
                    }
                })
                .catch(error => {
                    console.log(error);
                });
                
            },
            fetchListSubject() {
                this.$store.dispatch('documentation/fetchListSubject');
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
            checkSummary(value) {
                if (value.length < 16 || value.length > 256) {
                    this.message['summary'] = 'Tóm tắt phải có độ dài từ 16 đến 256 ký tự';
                }
                else {
                    this.message['summary'] = '';
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
            },
            summary(value) {
                this.summary = value
                this.checkSummary(value)
            },
        },
        created() {
            this.fetchListTagPure();
            this.fetchListSubject();
        },
    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>