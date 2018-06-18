<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="main-content">
                <div class="content-card">
                    <div class="tabs">
                        <h4 class="topquestion d-inline-block" style="cursor: pointer;" @click="goBack()">Quay lại</h4>
                        <ul class="nav nav-tabs d-flex justify-content-end">
                            <li class="nav-item">
                                <a class="nav-link" id="questions" :class="{ active: tab === 'questions' }" @click="changeTab">Câu hỏi</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="answers" :class="{ active: tab === 'answers' }" @click="changeTab">Câu trả lời</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="documentations" :class="{ active: tab === 'documentations' }" @click="changeTab">Tài liệu</a>
                            </li>
                        </ul>
                        <div class="tab-content" style="padding: 20px 10px;">
                            <div class="user_active" v-for="act in activities">
                                <p class="point non-answered-accepted" :class="generateClassNameType(act.best_answer)" >{{ act.voted }}</p>
                                <router-link :to="{ name: generateUrlNameType(), params: { id: act.id } }">{{ act.title }}</router-link>                            
                                <p class=" date float-right text-muted">{{ act.date.date | moment("DD-MM-YYYY") }}</p>
                            </div>
                        </div>
                        <br>
                        <Pagination v-if="pagination" :pagination="pagination" @paginate="paginate($event)" :offset="4"></Pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Pagination from '../assets/Pagination.vue'

    export default {
        components: {
            Pagination: Pagination,
        },
        data() {
            return {
                tab: "questions"
            };
        },
        computed: {
            activities() {
                return this.$store.getters['user/getAllActivity'].data;
            },
            pagination() {
                return this.$store.getters['user/getAllActivity'].meta;
            }
        },
        methods: {
            generateClassNameType(best_answer) {
                if (this.tab === 'documentations') {
                    return ''
                }
                else {
                    if (best_answer) {
                        return 'answered-accepted'
                    }
                    return ''
                }
            },
            generateUrlNameType() {
                if (this.tab === 'documentations') {
                    return 'detail-documentation'
                }
                return 'detail-question'                
            },
            changeTab() {
                this.tab = event.target.id;
                this.fetchAllActivity(this.$route.params.id,this.tab, 1)
            },
            goBack() {
                this.$emit('changeActivity', 'TopActivity')
            },
            fetchAllActivity(id, type = 'questions', page = 1) {
                let payload = {
                    type: this.tab,
                    id: id,
                    page: page
                }
                this.$store.dispatch('user/fetchAllActivity', payload);
            },
            paginate(page) {
                this.fetchAllActivity(this.$route.params.id, this.tab, page)
            },
        },
        created() {
            this.fetchAllActivity(this.$route.params.id)
        },
        mounted() {
            // console.log('Component mounted.')
        }
    };
</script>
