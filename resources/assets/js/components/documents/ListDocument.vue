<template>
    <!-- Content -->
    <div class="content">
        <div class="container">
            <div class="row">
                <div class="col-lg-9">
                    <div class="main-content">
                        <div class="content-card">
                            <div class="content-list">
                                <h4 class="topquestion d-inline-block">Tất Cả Tài Liệu</h4>
                                <hr>

                                <form id="form-search" action="" method="GET">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="input-group">
                                                <input id="key_search" type="text" class="form-control" name="keyword" placeholder="Nhập từ khóa cần tìm" >
                                                <span class="input-group-btn" >
                                                    <button id="btn-search" type="button" class="btn btn-success">Tìm kiếm</button>
                                                    <button class="btn btn-secondary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                                        Nâng cao
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="collapse" id="collapseExample">
                                        <div class="row">
                                            <div class="col-lg-3">
                                                <select class="form-control" v-model="subject">
                                                    <option value="0">--- Chủ đề ---</option>
                                                    <option v-for="subject in subjects"  :value='subject.id'>{{ subject.name }}</option>
                                                </select>
                                            </div>
                                            <div class="col-lg-9">
                                                <input class="form-control" type="text" name="" placeholder="Thẻ của tài liệu"  data-role="tagsinput">
                                                <input type="text" id="list-tag" hidden="" name="list_tag" value="0" >
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                
                                <div class="tabs">
                                    <ul class="nav nav-tabs d-flex justify-content-end" id="TagsTabContent" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link" id="newest" :class="{ active: tab === 'newest' }" @click="changeTab">Mới Nhất</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="view" :class="{ active: tab === 'view' }" @click="changeTab">Lượt Xem</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="vote" :class="{ active: tab === 'vote' }" @click="changeTab">Yêu thích</a>
                                        </li>
                                    </ul>
                                    <div class="tab-content" id="">
                                            <ItemDocument v-for="documentation in documentations" :key="documentation.id" :documentation="documentation"></ItemDocument>
                                    </div>
                                    <br>
                                    <Pagination v-if="pagination" :pagination="pagination" @paginate="paginate($event)" :offset="4"></Pagination>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="sub-content" >
                        <div class="btn-documentation">
                            <a style="text-decoration: none;" href=""><button type="button" class="btn btn-success btn-block btn-lg">Chia sẻ tài liệu ngay !!!</button></a>
                        </div>
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
    import ItemDocument from './ItemDocument.vue'
    import Pagination from '../assets/Pagination.vue'
    import LeaderBoard from '../assets/LeaderBoard.vue'
    import CommonTag from '../assets/CommonTag.vue'

    export default {
        components: {
            ItemDocument: ItemDocument,
            Pagination: Pagination,
            LeaderBoard: LeaderBoard,
            CommonTag: CommonTag,
        },
        
        data() {
            return {
                tab: 'newest',
                subject: 0,
            }
        },
        computed: {
            documentations() {
                return this.$store.getters['documentation/getListDocumentation'].data;
            },
            subjects(){
                return this.$store.getters['documentation/getSubject'].data;
            },
            pagination() {
                return this.$store.getters['documentation/getListDocumentation'].meta;
            }
        },
        methods: {
            changeTab() {
                this.tab = event.target.id;
                this.fetchListDocumentation(this.tab);
            },
            paginate(page) {
                this.fetchListDocumentation(this.tab, page)
            },
            fetchListDocumentation(sort = 'newest', page = 1) {
                let payload = { 'sort': sort, 'page': page }
                this.$store.dispatch('documentation/fetchListDocumentation', payload);
            },
            fetchListSubject() {
                this.$store.dispatch('documentation/fetchListSubject');
            }
        },
        created() {
            this.fetchListDocumentation();
            this.fetchListSubject();
        },
    }
</script>
