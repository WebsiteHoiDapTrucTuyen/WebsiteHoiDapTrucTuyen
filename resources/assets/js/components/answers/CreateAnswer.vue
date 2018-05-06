<template>
    <div class="add-answer" v-if="checkAuthenticated">
        <div>
            <h2>Câu trả lời của bạn</h2>
            <br>
            <h5>Bạn có thể trả lời câu hỏi này? Hãy chia sẻ nó cho mọi người.</h5>
            <div class="form-group">
                <editor rows="10" api-key="jaghjq8xkau4fx4v7ct8j1y2pvughbdsgz57qkwotbooubbv" v-model="content" :init="config"></editor>
            </div>
            <button class="btn btn-primary" style="padding: 10px 50px;" @click="addAnswer(id)">Trả lời</button>
        </div>
        <sweet-modal icon="error" title="Đã xảy ra lỗi" ref="modal">
            {{ message }}
        </sweet-modal>
    </div>
</template>

<script>
    import { SweetModal } from 'sweet-modal-vue'
    import Editor from '@tinymce/tinymce-vue';

    export default {
        components: {
            SweetModal,
            Editor
        },
        props: {
            id: {
                type: Number,
                require: true
            }
        },
        data() {
            return {
                content: '',
                config: {
                    selector: 'textarea.tinymce',
                    language_url: '../js/vi_VN.js',
                    menubar: true,
                    plugins: [
                    'advlist autolink lists link image charmap print preview anchor textcolor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table contextmenu paste code help emoticons codesample'
                    ],
                    toolbar: 'insert | undo redo |  formatselect | fontsizeselect | codesample code | emoticons | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                },
                message: ''
            }
        },
        computed: {
            checkAuthenticated() {
                return this.$store.getters['user/checkAuthenticated']
            },
        },
        methods: {
            addAnswer(id) {
                let content = this.content.trim(); 
                if (content.length > 0) {
                    let payload = {
                        'id': id,
                        'data': {
                            'content': content
                        }
                    }

                    this.$store.dispatch('answer/fetchStoreAnswer', payload)
                    .then(response => {
                        // console.log(response)
                        if (!response.data.hasOwnProperty('errors')) {
                            this.content = ''
                        }
                        else {
                            this.message = 'Bạn đã trả lời cho câu hỏi này. Hoặc không thể thực hiện thao tác. Vui lòng thử lại sau'
                            this.$refs.modal.open()
                        }
                    });
                }
                else {
                    this.content = ''
                    this.message = 'Vui lòng nhập nội dung câu trả lời'
                    this.$refs.modal.open()
                }
            }
        },
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>

<style type="text/css">
    .sweet-content-content {
        font-size: 30px;
    }
    .sweet-title {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>
