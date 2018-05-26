<template>
    <!-- Content -->
    <div class="content" v-if="questions">
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
                                    <ItemQuestion v-for="question in questions" :key="question.id" :question="question"></ItemQuestion>
                                </div>
                                <br>
                                <Pagination v-if="pagination" :pagination="pagination" @paginate="paginate($event)" :offset="4"></Pagination>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="sub-content">
                        <div class="btn-question">
                            <router-link :to="{ name: 'create-question' }">
                                <button type="button" class="btn btn-success btn-block btn-lg">Đặt câu hỏi ngay !!!</button>
                            </router-link>
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
    import ItemQuestion from './ItemQuestion.vue'
    import Pagination from '../assets/Pagination.vue'
    import InformationQuestion from '../assets/InformationQuestion.vue'
    import LeaderBoard from '../assets/LeaderBoard.vue'
    import CommonTag from '../assets/CommonTag.vue'

    export default {
        components: {
            ItemQuestion: ItemQuestion,
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
                return this.$store.getters['question/getListQuestion'].data;
            },
            pagination() {
                return this.$store.getters['question/getListQuestion'].meta;
            }
        },
        methods: {
            changeTab() {
                this.tab = event.target.id;
                this.fetchListQuestion(this.tab);
            },
            paginate(page) {
                this.fetchListQuestion(this.tab, page)
            },
            fetchListQuestion(sort = 'newest', page = 1) {
                let payload = { 'sort': sort, 'page': page }
                this.$store.dispatch('question/fetchListQuestion', payload);
            }
        },
        created() {
            this.fetchListQuestion();
        },
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>
