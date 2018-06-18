<template>
    <!-- Content -->
    <div class="content" v-if="question">
        <div class="container">
            <div class="row">
                <div class="col-lg-9">
                    <div class="main-content">
                        <div class="content-card">
                            <div class="row">
                                <div class="col-lg-1">
                                    <div class="detail-left">
                                        <div class="avatar-circle d-flex justify-content-center">
                                            <img :src="sourceImage(question.user.avatar)" class="rounded-circle" width="40" height="40">
                                        </div>
                                        <div class="vote-widget">
                                            <div class="vote-up d-flex justify-content-center">
                                                <span id="up" class="oi oi-caret-top" style="display: block;"></span>
                                            </div>
                                            <div id="point-question" class="vote-count d-flex justify-content-center">
                                                {{ question.voted }}
                                            </div>
                                            <div class="vote-down d-flex justify-content-center">
                                                <span id="down" class="oi oi-caret-bottom" style="display: block;"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-11 break-word">
                                    <div class="detail-right">
                                        <div class="avatar-name">
                                            <a href="">{{ question.user.name }}</a> 
                                        </div>
                                        <div class="question-detail-title">
                                            {{ question.title }}
                                        </div>
                                        <div class="question-detail-content" v-html="question.content">
                                            
                                        </div>
                                        <div class="list-tag">
                                            <a href="" v-for="tag in question.tags">
                                                <div class="tag">
                                                    {{ tag.name }}
                                                </div>
                                            </a>
                                        </div>
                                        <br><br>
                                        <div v-if="checkOwner">
                                            <router-link :to="{ name: 'edit-question', params: { id: question.id } }">
                                                <button class="btn btn-warning">Chỉnh sửa</button>
                                            </router-link>
                                            <button class="btn btn-danger" @click="deleteEntry()">Xóa</button>
                                        </div>
                                        <br>
                                        <Comment :comments="question.comments" :id="question.id" :type="'question'"></Comment>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Answer :id="question.id"></Answer>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="sub-content">
                        <div class="btn-question">
                            <router-link :to="{ name: 'create-question' }">
                                <button type="button" class="btn btn-success btn-block btn-lg">Đặt câu hỏi ngay !!!</button>
                            </router-link>
                        </div>
                        <div class="content-card">
                            <div class="question-info">
                                <div class="info-header">
                                    <p>Thông tin</p>
                                </div>
                                <hr>
                                <div class="info-content">
                                    <div class="info-content-asked">
                                        <div class="row">
                                            <div class="col-lg-4 info-content-left">
                                                <p>Đã hỏi</p>
                                            </div>
                                            <div class="col-lg-8 info-content-right">
                                                <p>{{ question.date.date }}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="info-content-viewed">
                                        <div class="row">
                                            <div class="col-lg-4 info-content-left">
                                                <p>Đã xem</p>
                                            </div>
                                            <div class="col-lg-8 info-content-right">
                                                <p>{{ question.viewed }}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="info-content-activity">
                                        <div class="row">
                                            <div class="col-lg-4 info-content-left">
                                                <p>Trả lời</p>
                                            </div>
                                            <div class="col-lg-8 .info-content-right">
                                                <p>{{ question.answered }} câu trả lời</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="info-content-bestanswer">
                                        <div class="row">
                                            <div class="col-lg-4 info-content-left">
                                                <p>Best Ans</p>
                                            </div>
                                            <div class="col-lg-8 .info-content-right">
                                                <span class="oi oi-check best-answer-normal" v-if="question.best_answer"></span>
                                                <span class="oi oi-x" style="font-size: 10px; color: red;" v-else></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <RelatedQuestion></RelatedQuestion>
                    </div>
                </div>

            </div>
        </div>
        <sweet-modal icon="warning" title="Cảnh báo" ref="modalDelete">
            Bạn chắc chắn muốn xóa bình luận này
            <button class="btn btn-success" style="margin: 20px 20px" @click="deleteQuestion(question.id)">Đồng ý</button>
            <button class="btn btn-danger" style="margin: 20px 20px" @click="cancelDeleteQuestion()">Hủy bỏ</button>
        </sweet-modal>
    </div>
    <!-- end Content -->
</template>

<script>
    import Answer from '../answers/Answer.vue'
    import RelatedQuestion from './RelatedQuestion.vue'
    import Comment from '../comments/Comment.vue' 
    import { SweetModal } from 'sweet-modal-vue'   

    export default {
        components: {
            Answer: Answer,
            RelatedQuestion: RelatedQuestion,
            Comment: Comment,
            SweetModal
        },
        computed: {
            question() {
                return this.$store.getters['question/getDetailQuestion'].data;
            },
            currentUser() {
                return this.$store.getters['user/getCurrentUser'].data
            },
            checkOwner() {
                return this.currentUser && this.question.user.id === this.currentUser.id
            },
        },
        methods: {
            sourceImage(url) {
                return "/images/avatar_users/" + url;
            },
            fetchDetailQuestion(id) {
                let payload = { 'id': id }
                this.$store.dispatch('question/fetchDetailQuestion', payload)
            },
            deleteEntry() {
                this.$refs.modalDelete.open()
            },
            cancelDeleteQuestion() {
                this.$refs.modalDelete.close()
            },
            deleteQuestion(id) {
                let payload = {
                    'id': id,
                }
                this.$store.dispatch('question/fetchDeleteQuestion', payload)
                .then(response => {
                    // console.log(response)
                    if (!response.data.hasOwnProperty('errors')) {
                        this.cancelDeleteQuestion()
                        this.$router.push({ name: 'list-question' });
                    }
                    else {
                        this.cancelDeleteQuestion()
                        this.message = 'Không thể thực hiện thao tác. Vui lòng thử lại sau'
                        this.$refs.modal.open()
                    }
                });
            }
        },
        watch: {
            '$route' (to, from) {
                this.fetchDetailQuestion(to.params.id)
            }
        },
        created() {
            this.fetchDetailQuestion(this.$route.params.id)
        },
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>
