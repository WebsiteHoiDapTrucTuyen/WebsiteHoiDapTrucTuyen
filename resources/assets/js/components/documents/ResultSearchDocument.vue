<template>
    <div class="content">
        <div class="container">
            <div class="row">
                <div class="col-lg-9">
                    <div class="main-content">
                        <div class="content-card">
                            <div class="content-list">
                                
                                <h4 class="topquestion d-inline-block">{{ result }}</h4>
                                <br>
                                <br>
                                <form id="form-search" @submit.prevent="searchDocumentation(1)">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div :style="styleObject" class="alert alert-warning">
                                                {{ message.errorskeyword }}
                                            </div>
                                            <div class="input-group">
                                                <input type="text" class="form-control" v-model="keyword" placeholder="Nhập từ khóa cần tìm" >
                                                <span class="input-group-btn" >
                                                    <button id="btn-search" type="submit" class="btn btn-success">Tìm kiếm</button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <br>
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
                                </form>
                                <br>
                                <hr>
                                <div class="tabs">
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
                subject: 0,
                keyword: '',
                result: '',
                tags: '',
                selectedTags: [],
                message: {},
                styleObject: {
                    display: 'none',
                  },
                curentPage: 0,
            }
        },
        computed: {
            documentations() {
                return this.$store.getters['documentation/getDocumentationSearch'].data;
            },
            subjects(){
                return this.$store.getters['documentation/getSubject'].data;
            },
            pagination() {
                return this.$store.getters['documentation/getDocumentationSearch'].meta;
            },
            optionTags() {
                return this.$store.getters['tag/getListTagPure'].data;
            },
        },
        methods: {
            paginate(page) {
                //console.log(this.curentPage);
                if (this.curentPage == 0){
                    this.fetchListSearchDocumentation(page);
                }
                else{
                    this.searchDocumentation(page);
                }
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
            fetchListSearchDocumentation(page=1){
                let payload = {
                    'page': page,
                    'data': this.$route.params.payload
                }

                this.$store.dispatch('documentation/fetchSearchDocumentation', payload )
                .then(response => {
                    if (response.data.hasOwnProperty('errors')) {
                        //this.message['errors'] = 'Không thể tìm kiếm';
                    }
                    else {
                        //console.log(response.data.data.length);
                        this.keyword= payload.data.keyword;
                        if (response.data.data.length > 0) {
                            if(this.keyword != 0){
                                this.result ='Kết quả tìm kiếm cho từ khóa: '+ '"' + this.keyword + '"';
                            }
                            else{
                                this.result ='Kết quả tìm kiếm: ';
                            }
                            
                        }
                        else{
                            if(this.keyword != 0){
                                this.result ='Không tìm thấy kết quả cho từ khóa: '+ '"' + this.keyword + '"';
                            }
                            else{
                                this.result ='Không có kết quả trùng khớp! ';
                            }
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            },
            searchDocumentation(page) {
                let payload = {
                    'page': page,
                    'data':{
                        'keyword': this.keyword,
                        'tags': this.tags,
                        'subject': this.subject,
                    }
                    
                }

                if(this.keyword.length == 0 && this.tags.length == 0 && this.subject == 0){
                    this.message['errorskeyword'] = 'Bạn chưa nhập key search!';
                    this.styleObject.display= 'block';
                }
                else{
                    this.styleObject.display= 'none';
                    this.$store.dispatch('documentation/fetchSearchDocumentation', payload )
                    .then(response => {
                        if (response.data.hasOwnProperty('errors')) {
                            //this.message['errors'] = 'Không thể tìm kiếm';
                        }
                        else {
                            this.curentPage = 1;
                            this.keyword= payload.data.keyword;
                            if (response.data.data.length > 0) {
                                if(this.keyword != 0){
                                    this.result ='Kết quả tìm kiếm cho từ khóa: '+ '"' + this.keyword + '"';
                                }
                                else{
                                    this.result ='Kết quả tìm kiếm: ';
                                }
                            }
                            else{
                               if(this.keyword != 0){
                                    this.result ='Không tìm thấy kết quả cho từ khóa: '+ '"' + this.keyword + '"';
                                }
                                else{
                                    this.result ='Không có kết quả trùng khớp! ';
                                }
                            }
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });   
                }
            },

        },
        created() {
            this.fetchListSearchDocumentation();
            this.fetchListSubject();
            this.fetchListTagPure();
        },
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>