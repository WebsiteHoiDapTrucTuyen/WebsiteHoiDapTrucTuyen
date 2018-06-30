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
										<ItemUser v-for="user in users" :key="user.id" :user="user"></ItemUser>
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
    import ItemUser from './ItemUser.vue'
    import Pagination from '../assets/Pagination.vue'

    export default {
        components: {
            ItemUser: ItemUser,
            Pagination: Pagination,
        },
        
        data() {
            return {
               result: '',
               keyword: '',
            }
        },
        computed: {
            users() {
                return this.$store.getters['listuser/getUserSearch'].data;
            },
            pagination() {
                return this.$store.getters['listuser/getUserSearch'].meta;
            }
        },
        methods: {
            paginate(page) {
                this.fetchListSearchUser(page)
            },
            fetchListSearchUser(page=1){
                let payload = {
                    'page': page,
                    'data': this.$route.params.payload
                }

                this.$store.dispatch('listuser/fetchSearchUser', payload )
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
            this.fetchListSearchUser();
        },
    }
</script>