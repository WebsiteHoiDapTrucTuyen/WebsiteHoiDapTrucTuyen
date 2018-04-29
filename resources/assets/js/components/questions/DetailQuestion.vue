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
                                            <img :src="sourceImage(question.user_owner.avatar)" class="rounded-circle" width="40" height="40">
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
                                            <a href="">{{ question.user_owner.name }}</a> 
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
                            <a href="">
                                <button type="button" class="btn btn-success btn-block btn-lg">Đặt câu hỏi ngay !!!</button>
                            </a>
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
    </div>
    <!-- end Content -->
</template>

<script>
    import Answer from '../answers/Answer.vue'
    import RelatedQuestion from './RelatedQuestion.vue'
    import Comment from '../comments/Comment.vue'    

    export default {
        components: {
            Answer: Answer,
            RelatedQuestion: RelatedQuestion,
            Comment: Comment,
        },
        computed: {
            question() {
                return this.$store.getters['question/getDetailQuestion'].data;
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
        },
        created() {
            this.fetchDetailQuestion(this.$route.params.id)
        },
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>
