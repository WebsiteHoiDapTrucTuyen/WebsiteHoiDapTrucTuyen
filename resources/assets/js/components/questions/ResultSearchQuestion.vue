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
	                            <form @submit.prevent="searchQuestion(1)">
	                            	<div :style="styleObject" class="alert alert-warning">
                                        {{ message.errorskeyword }}
                                    </div>
	                                <div class="row">
	                                    <div class="col-lg-4">
	                                        <input type="text" class="form-control" v-model="keyword" placeholder="Nhập từ khóa cần tìm">
	                                    </div>
	                                    <div class="col-lg-6">
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
	                                    <div class="col-lg-2">
	                                        <button type="submit" id="filter" style="padding-left: 20px; padding-right: 20px;" class="btn btn-primary"><i class="fa fa-filter fa-fw"></i>Lọc</button>
	                                    </div>
	                                </div>
	                            </form>
	                            <hr>
	                            <ItemQuestion v-for="question in questions" :key="question.id" :question="question"></ItemQuestion>
	                        </div>
	                        <Pagination v-if="pagination" :pagination="pagination" @paginate="paginate($event)" :offset="4"></Pagination>
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
                        <LeaderBoard></LeaderBoard>
                        <CommonTag></CommonTag>
                    </div>
	           </div>
	        </div>
	    </div>
	</div>
</template>
<script>
    import ItemQuestion from './ItemQuestion.vue'
    import Pagination from '../assets/Pagination.vue'
    import LeaderBoard from '../assets/LeaderBoard.vue'
    import CommonTag from '../assets/CommonTag.vue'
    import Multiselect from 'vue-multiselect'

    export default {
        components: {
            ItemQuestion: ItemQuestion,
            Pagination: Pagination,
            LeaderBoard: LeaderBoard,
            CommonTag: CommonTag,
            Multiselect: Multiselect,
        },
        data() {
            return {
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
            questions() {
                return this.$store.getters['question/getQuestionSearch'].data;
            },
            pagination() {
                return this.$store.getters['question/getQuestionSearch'].meta;
            },
            optionTags() {
                return this.$store.getters['tag/getListTagPure'].data;
            },
        },
        methods: {
            
            paginate(page) {
                
                if (this.curentPage == 0){
                    this.fetchListQuestionSearch(page);
                }
                else{
                    this.searchQuestion(page);
                }
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
            fetchListQuestionSearch(page = 1) {
                let payload = {
                    'page': page,
                    'data': this.$route.params.payload
                }

                this.$store.dispatch('question/fetchSearchQuestion', payload)
                .then(response => {
                    if (response.data.hasOwnProperty('errors')) {
                        //this.message['errors'] = 'Không thể tìm kiếm';
                    }
                    else {
                        //console.log(response.data.data.length);
                        if (response.data.data.length > 0) {
                            this.keyword =payload.data.keyword;
                            this.result ='Kết quả tìm kiếm cho từ khóa: '+ '"' + this.keyword + '"';
                        }
                        else{
                            this.keyword =payload.data.keyword;
                            this.result ='Không tìm thấy kết quả cho từ khóa: '+ '"' + this.keyword + '"';
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            },
            searchQuestion(page) {
                let payload = {
                    'page': page,
                    'data':{
                        'keyword': this.keyword,
                        'tags': this.tags,
                    }
                }

                if(this.keyword.length == 0){
                    this.message['errorskeyword'] = 'Bạn chưa nhập key search!';
                    this.styleObject.display= 'block';
                }
                else{
                    this.styleObject.display= 'none';
                    this.$store.dispatch('question/fetchSearchQuestion', payload )
                    .then(response => {
                        if (response.data.hasOwnProperty('errors')) {
                            //this.message['errors'] = 'Không thể tìm kiếm';
                        }
                        else {
                            this.curentPage = 1;
                            if (response.data.data.length > 0) {
                                this.keyword =payload.data.keyword;
                                this.result ='Kết quả tìm kiếm cho từ khóa: '+ '"' + this.keyword + '"';
                            }
                            else{
                                this.keyword =payload.data.keyword;
                                this.result ='Không tìm thấy kết quả cho từ khóa: '+ '"' + this.keyword + '"';
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
            this.fetchListQuestionSearch();
            this.fetchListTagPure();
        },
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>