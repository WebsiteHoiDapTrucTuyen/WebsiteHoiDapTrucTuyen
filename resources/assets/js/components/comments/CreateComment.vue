<template>
    <!--create comment-->
    <div class="form-comment" v-if="checkAuthenticated">
        <div>
            <div class="form-group">
                <textarea class="form-control" placeholder="Viết bình luận của bạn..." rows="2" v-model="content" 
                @keyup.enter="addComment(type, id, index)"></textarea>
            </div>
        </div>
        <sweet-modal icon="error" title="Đã xảy ra lỗi" ref="modal">
            {{ message }}
        </sweet-modal>
    </div>
</template>

<script>
    import { SweetModal } from 'sweet-modal-vue'

    export default {
        components: {
            SweetModal
        },
        props: {
            id: {
                type: Number,
                require: true
            },
            type: {
                type: String,
                require: true
            },
            index: {    //only answer
                type: Number,
            }
        },
        data() {
            return {
                content: '',
                message: ''
            }
        },
        computed: {
            checkAuthenticated() {
                return this.$store.getters['user/checkAuthenticated']
            },
        },
        methods: {
            addComment(type, id, index) {
                let content = this.content.trim(); 
                if (content.length > 0) {
                    let payload = {
                        'type': type,
                        'id': id,
                        'data': {
                            'content': content
                        }
                    }

                    this.$store.dispatch('comment/fetchStoreComment', payload)
                    .then(response => {
                        // console.log(response)
                        if (!response.data.hasOwnProperty('errors')) {
                            let payload = { 
                                'comment': response.data.data,
                                'index': index
                            }
                            this.$store.dispatch(type + '/addComment', payload)
                                .then( this.content = '' )
                        }
                        else {
                            this.message = 'Không thể thực hiện thao tác. Vui lòng thử lại sau'
                            this.$refs.modal.open()
                        }
                    });
                }
                else {
                    this.content = ''
                    this.message = 'Vui lòng nhập nội dung cho câu bình luận'
                    this.$refs.modal.open()
                }
            }
        },
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>
