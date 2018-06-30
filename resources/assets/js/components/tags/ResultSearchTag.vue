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
                keyword: '',
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
                    'data': this.$route.params.payload
                }

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
            },
        },
        created() {
            this.fetchListSearchTag();
        },
    }
</script>