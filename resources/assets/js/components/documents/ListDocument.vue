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

                                <form id="form-search" @submit.prevent="searchDocumentation">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div :style="styleObject" class="alert alert-warning">
                                                {{ message.errorskeyword }}
                                            </div>
                                            <div class="input-group">
                                                <input type="text" class="form-control" v-model="keyword" placeholder="Nhập từ khóa cần tìm" >
                                                <span class="input-group-btn" >
                                                    <button id="btn-search" type="submit" class="btn btn-success">Tìm kiếm</button>
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
                                                <div class="form-group" v-if="optionTags">
                                                    <multiselect v-model="selectedTags" :options="optionTags"
                                                    placeholder="Thẻ của tài liệu" label="name" track-by="name" 
                                                    :multiple="true"
                                                    :taggable="true"
                                                    tag-placeholder=""
                                                    @input="updateTags"
                                                    :close-on-select="false" required></multiselect>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                
                                <div class="tabs">
                                    <ul class="nav nav-tabs d-flex justify-content-end" id="TagsTabContent" role="tablist">
                                        <li class="nav-item">
                                            <a style="cursor: pointer;" class="nav-link" id="newest" :class="{ active: tab === 'newest' }" @click="changeTab">Mới Nhất</a>
                                        </li>
                                        <li class="nav-item">
                                            <a style="cursor: pointer;" class="nav-link" id="view" :class="{ active: tab === 'view' }" @click="changeTab">Lượt Xem</a>
                                        </li>
                                        <li class="nav-item">
                                            <a style="cursor: pointer;" class="nav-link" id="vote" :class="{ active: tab === 'vote' }" @click="changeTab">Yêu thích</a>
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
                            <router-link :to="{ name: 'create-document' }" style="text-decoration: none;">
                                <button type="button" class="btn btn-success btn-block btn-lg">Chia sẻ tài liệu ngay !!!</button>
                            </router-link>
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
    import Multiselect from 'vue-multiselect'


    export default {
        components: {
            ItemDocument: ItemDocument,
            Pagination: Pagination,
            LeaderBoard: LeaderBoard,
            CommonTag: CommonTag,
            Multiselect: Multiselect,
        },
        
        data() {
            return {
                tab: 'newest',
                subject: 0,
                keyword: '',
                tags:'',
                selectedTags: [],
                message:{},
                styleObject: {
                    display: 'none',
                  } 
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
            },
            optionTags() {
                return this.$store.getters['tag/getListTagPure'].data;
            },
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
            },
            fetchListTagPure() {
                this.$store.dispatch('tag/fetchListTagPure');
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
            searchDocumentation() {
                let payload = {
                   
                    'keyword': this.keyword,
                    'tags': this.tags,
                    'subject': this.subject,
                }

                if(this.keyword.length == 0 && this.tags.length == 0 && this.subject == 0){
                    this.message['errorskeyword'] = 'Bạn chưa nhập key search!';
                    this.styleObject.display= 'block';
                }
                else{
                    this.$router.push({ name: 'search-document', query: { keyword: this.keyword, tags: this.tags, subject: this.subject }});    
                }
            },

        },
        created() {
            this.fetchListDocumentation();
            this.fetchListSubject();
            this.fetchListTagPure();
        },
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>