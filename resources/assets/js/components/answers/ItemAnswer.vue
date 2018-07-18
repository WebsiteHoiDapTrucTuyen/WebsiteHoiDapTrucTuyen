<template>
    <div class="answer">
        <div class="row">
            <div class="col-lg-1">
                <div class="detail-left">
                    <div class="avatar-circle d-flex justify-content-center">
                        <img :src="sourceImage(answer.user.avatar)" class="rounded-circle" width="40" height="40">
                    </div>
                    <div class="vote-widget">
                        <div class="vote-up d-flex justify-content-center">
                            <span id="up" class="oi oi-caret-top" style="display: block;" :class="isVoted('up')"
                            @click="vote('answer', answer.id, 'up')"></span>
                        </div>
                        <div id="point-answer" class="vote-count d-flex justify-content-center">
                            {{ answer.voted }}
                        </div>
                        <div class="vote-down d-flex justify-content-center">
                            <span id="down" class="oi oi-caret-bottom" style="display: block;" :class="isVoted('down')"
                            @click="vote('answer', answer.id, 'down')"></span>
                        </div>
                    </div>
                    <div class="best-answer-widget d-flex justify-content-center">
                        <span v-if="answer.best_answer" @click="bestAnswer(answer.id, answer.best_answer)" class="oi oi-check best-answer active-best"></span>
                        <span v-if="!answer.best_answer && currentUser && currentUser.id === question.user.id" @click="bestAnswer(answer.id, answer.best_answer)" class="oi oi-check best-answer"></span>
                    </div>
                </div>
            </div>
            <div class="col-lg-11 break-word">
                <div class="detail-right">
                    <div class="avatar-name">
                        <a href="">{{ answer.user.name }}</a> <span class="text-muted mr-3">
                            đã trả lời vào {{ answer.date_answer.date | moment("DD/MM/YYYY HH:mm:ss") }}
                        </span>
                    </div>
                    <div id="answer" class="answer-detail-content">
                        <div v-if="!isEdit">
                            <div v-html=answer.content>
                                
                            </div>
                            <div v-if="checkOwner">
                                <button class="btn btn-warning" @click="edit">Chỉnh sửa</button>
                                <button class="btn btn-danger" @click="deleteEntry()">Xóa</button>
                            </div>

                        </div>
                        <div v-else>
                            <editor rows="10" api-key="jaghjq8xkau4fx4v7ct8j1y2pvughbdsgz57qkwotbooubbv" v-model="content" :init="config"></editor>
                            <div class="float-right">
                                <a @click="cancelEditAnswer()"><span style="color: red; font-size: 15px;" class="oi oi-circle-x mr-2"></span></a>
                                <a @click="editAnswer(answer.id, index)"><span style="color: green; font-size: 15px;" class="oi oi-circle-check"></span></a>
                            </div>
                        </div>
                    </div>
                    <br><br>
                    <Comment :comments="answer.comments" :id="answer.id" :type="'answer'" :index="index"></Comment>
                </div>
            </div>
        </div>
        <hr>
        <sweet-modal icon="error" title="Đã xảy ra lỗi" ref="modal">
            {{ message }}
        </sweet-modal>
        <sweet-modal icon="warning" title="Cảnh báo" ref="modalDelete">
            Bạn chắc chắn muốn xóa bình luận này
            <button class="btn btn-success" style="margin: 20px 20px" @click="deleteAnswer(answer.id, index)">Đồng ý</button>
            <button class="btn btn-danger" style="margin: 20px 20px" @click="cancelDeleteAnswer()">Hủy bỏ</button>
        </sweet-modal>
    </div>
</template>

<script>
    import Comment from '../comments/Comment.vue'
    import Editor from '@tinymce/tinymce-vue'
    import { SweetModal } from 'sweet-modal-vue'

    export default {
        components: {
            Editor,
            SweetModal,
            Comment: Comment
        },
        props: {
            answer: {
                type: Object,
                require: true
            },
            index: {
                type: Number,
                require: true
            }
        },
        data() {
            return {
                isEdit: false,
                content: this.answer.content,
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
            currentUser() {
                return this.$store.getters['user/getCurrentUser'].data
            },
            checkOwner() {
                return this.currentUser && this.answer.user.id === this.currentUser.id
            },
            question() {
                return this.$store.getters['question/getDetailQuestion'].data;
            },
        },
        methods: {
            sourceImage(url) {
                return "/images/avatar_users/" + url;
            },
            edit() {
                this.isEdit = true
            },
            deleteEntry() {
                this.$refs.modalDelete.open()
            },
            deleteAnswer(id, index) {
                let payload = {
                    'id': id,
                    'index': index,
                }
                this.$store.dispatch('answer/fetchDeleteAnswer', payload)
                .then(response => {
                    // console.log(response)
                    if (!response.data.hasOwnProperty('errors')) {
                        this.cancelDeleteAnswer
                    }
                    else {
                        this.cancelDeleteAnswer
                        this.message = 'Không thể thực hiện thao tác. Vui lòng thử lại sau'
                        this.$refs.modal.open()
                    }
                });
            },
            cancelDeleteAnswer() {
                this.$refs.modalDelete.close()
            },
            editAnswer(id ,index) {
                let content = this.content.trim(); 
                if (content.length > 0) {
                    let payload = {
                        'id': id,
                        'data': {
                            'content': content,
                        },
                        'index': index
                    }

                    this.$store.dispatch('answer/fetchUpdateAnswer', payload)
                    .then(response => {
                        // console.log(response)
                        if (!response.data.hasOwnProperty('errors')) {
                            this.cancelEditAnswer()
                        }
                        else {
                            this.message = 'Không thể thực hiện thao tác. Vui lòng thử lại sau'
                            this.$refs.modal.open()
                        }
                    });
                }
                else {
                    this.content = this.answer.content
                    this.message = 'Vui lòng nhập nội dung câu trả lời'
                    this.$refs.modal.open()
                }
            },
            cancelEditAnswer() {
                this.isEdit = false
            },
            isVoted(action) {
                if (this.answer.current_user_voted && this.answer.current_user_voted.action === action) {
                    return 'active-vote'
                }
                return ''
            },
            vote(type, id, action) {
                if (this.currentUser) {
                    this.fetchVoteAction(type, id, action)
                }
            },
            fetchVoteAction(type, id, action) {
                let payload = {
                    type: type,
                    id: id,
                    data: {
                        action: action
                    }
                }
                this.$store.dispatch('vote/fetchVoteAction', payload)
                .then(response => {
                    this.fetchVoteAnswer(id, this.index)
                })
            },
            fetchVoteAnswer(id, index) {
                let payload = {
                    id: id,
                    index: index
                }
                this.$store.dispatch('answer/fetchVoteAnswer', payload)
            },
            bestAnswer(id, isBestAnswer) {
                this.fetchBestAnswer(id, isBestAnswer)
            },
            fetchBestAnswer(id, isBestAnswer) {
                let payload = {
                    id: id,
                    isBestAnswer: isBestAnswer
                }
                this.$store.dispatch('answer/fetchBestAnswer', payload)
            }
        },
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>
