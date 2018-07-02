<template>
	<div class="content">
		<div class="container">
			<div class="row">
				<div class="col-lg-12 ">
					<div class="main-content">
						<div class="content-card">
							<div class="tabs">
								<h4 class="topquestion d-inline-block">{{ result }}</h4>
								<br>
								<br>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <form id="form-search" @submit.prevent="fetchListSearchTag(1)">
                                            <div :style="styleObject" class="alert alert-warning">
                                                {{ message.errorskeyword }}
                                            </div>
                                            <div class="input-group">
                                                <input id="key_search" type="text" class="form-control" v-model="keyword" placeholder="Nhập từ khóa cần tìm">
                                                <span class="input-group-btn" >
                                                    <button id="btn-search" type="submit" class="btn btn-success">Tìm kiếm</button>
                                                </span>
                                            </div>
                                        </form>
                                    </div>
                                </div>
								<br>
								<hr>
								<br>
								<div>
									<div class="row">
										<ItemTag v-for="tag in tags" :key="tag.id" :tag="tag"></ItemTag>
									</div>
								</div>
								<Pagination v-if="pagination" :pagination="pagination" @paginate="paginate($event)" :offset="4"></Pagination>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>			
	</div>
</template>
<script>
    import ItemTag from './ItemTag.vue'
    import Pagination from '../assets/Pagination.vue'

    export default {
        components: {
            ItemTag: ItemTag,
            Pagination: Pagination,
        },
        
        data() {
            return {
                result: '',
                keyword: this.$route.params.payload.keyword,
                message:{},
                styleObject: {
                    display: 'none',
                  } 
            }
        },
        computed: {
            tags() {
                return this.$store.getters['tag/getTagSearch'].data;
            },
            pagination() {
                return this.$store.getters['tag/getTagSearch'].meta;
            }
        },
        methods: {
            paginate(page) {
                this.fetchListSearchTag(page)
            },
            fetchListSearchTag(page=1){
                let payload = {
                    'page': page,
                    'data': {
                        'keyword': this.keyword,
                    }
                }

                if(this.keyword.length == 0){
                    this.message['errorskeyword'] = 'Bạn chưa nhập key search!';
                    this.styleObject.display= 'block';
                }
                else{
                    this.styleObject.display= 'none';
                    this.$store.dispatch('tag/fetchSearchTag', payload )
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
                }

            },
        },
        created() {
            this.fetchListSearchTag();
        },
    }
</script>