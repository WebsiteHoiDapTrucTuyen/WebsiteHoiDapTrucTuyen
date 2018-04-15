<template>
    <!-- Content -->
    <div class="content">
        <div class="container">
            <div class="row">
                <div class="col-lg-9">
                    <div class="main-content">
                        <div class="content-card">
                            <div class="tabs">
                                <h4 class="topquestion d-inline-block">Tất Cả Câu Hỏi</h4>
                                <ul class="nav nav-tabs d-flex justify-content-end">
                                    <li class="nav-item">
                                        <a class="nav-link" id="newest" :class="{ active: tab === 'newest' }" @click="changeTab">Mới Nhất</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="view" :class="{ active: tab === 'view' }" @click="changeTab">Lượt Xem</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="answer" :class="{ active: tab === 'answer' }" @click="changeTab">Trả Lời</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="vote" :class="{ active: tab === 'vote' }" @click="changeTab">Bình Chọn</a>
                                    </li>
                                </ul>
                                <div class="tab-content">
                                    <div class="question-summary" v-for="question in questions.data" :key="question.id">
                                        <div class="row">
                                            <div class="statistic col-lg-4">
                                                <div class="count-views">
                                                    <span>{{ question.viewed }}</span>
                                                    <div>lượt xem</div>
                                                </div>
                                                <div class="count-answers">
                                                    <span>{{ question.answered }}</span>
                                                    <div>câu trả lời</div>
                                                </div>
                                                <div class="count-votes">
                                                    <span>{{ question.voted }}</span>
                                                    <div>bình chọn</div>
                                                </div>
                                            </div>
                                            <div class="summary col-lg-8 break-word">
                                                <div class="summary-title">
                                                    <div class="summary-title">
                                                        <h6><a href="">{{ question.title }}</a></h6>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                   <div class="list-tag col-lg-7">
                                                        <a href="" v-for="tag in question.tags">
                                                            <p class="tag">{{ tag.name }}</p>
                                                        </a>
                                                    </div>
                                                    <div class="started col-lg-5">
                                                        <p class="user"><a href="">{{ question.user_last_interact.name }}</a></p>
                                                        <p class="action">{{ question.user_last_interact.interact }}</p>
                                                        <p class="time">{{ question.user_last_interact.date_interact.date }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br>
                                    <Pagination v-if="questions.meta" :pagination="questions.meta" @paginate="fetchListQuestion($event)" :offset="4"></Pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="sub-content">
                        <div class="btn-question">
                            <a href="">
                                <button type="button" class="btn btn-success btn-block btn-lg">Đặt câu hỏi ngay !!!</button>
                            </a>
                        </div>
                        <InformationQuestion></InformationQuestion>
                        <LeaderBoard></LeaderBoard>
                        <CommonTag></CommonTag>
                    </div>
               </div>
            </div>
        </div>
    </div>
    <!-- end Content -->
</template>

<script>
    import Pagination from '../assets/Pagination.vue'
    import InformationQuestion from '../assets/InformationQuestion.vue'
    import LeaderBoard from '../assets/LeaderBoard.vue'
    import CommonTag from '../assets/CommonTag.vue'

    export default {
        components: {
            Pagination: Pagination,
            InformationQuestion: InformationQuestion,
            LeaderBoard: LeaderBoard,
            CommonTag: CommonTag
        },
        data() {
            return {
                tab: 'newest'
            }
        },
        computed: {
            questions() {
                return this.$store.getters['question/getListQuestion'];
            }
        },
        methods: {
            changeTab() {
                this.tab = event.target.id;
                let payload = { 'sort': this.tab, 'page': 1 }
                this.$store.dispatch('question/fetchListQuestion', payload);
            },
            fetchListQuestion(page = 1) {
                let payload = { 'sort': this.tab, 'page': page }
                this.$store.dispatch('question/fetchListQuestion', payload);
            }
        },
        created() {
            let payload = { 'sort': 'newest', 'page': 1 }
            this.$store.dispatch('question/fetchListQuestion', payload);
        },
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>
