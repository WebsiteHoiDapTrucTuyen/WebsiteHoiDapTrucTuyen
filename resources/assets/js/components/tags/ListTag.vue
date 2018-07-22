<template>
	<div class="content">
		<div class="container">
			<div class="row">
				<div class="col-lg-12 ">
					<div class="main-content">
						<div class="content-card">
							<div class="tabs">
								<h4 class="topquestion d-inline-block">Thẻ</h4>
								<br>
								<br>
								<div class="row">
									<div class="col-lg-6">
										<form id="form-search" @submit.prevent="searchTags">
											<div :style="styleObject" class="alert alert-warning">
                                                {{ message.errorskeyword }}
                                            </div>
											<div class="input-group">
												<input id="key_search" type="text" class="form-control" v-model="keyword" placeholder="Nhập từ khóa cần tìm" >
												<span class="input-group-btn" >
													<button id="btn-search" type="submit" class="btn btn-success">Tìm kiếm</button>
												</span>
											</div>
										</form>
									</div>
								</div>
								<br>
								<ul class="nav nav-tabs d-flex justify-content-end" id="TagsTabContent" role="tablist">
									<li class="nav-item">
										<a style="cursor: pointer;" class="nav-link" id="popular" :class="{ active: tab === 'popular' }" @click="changeTab">Phổ Biến</a>
									</li>
									<li class="nav-item">
										<a style="cursor: pointer;" class="nav-link" id="name" :class="{ active: tab === 'name' }" @click="changeTab">Tên</a>
									</li>
									<li class="nav-item">
										<a style="cursor: pointer;" class="nav-link" id="newest" :class="{ active: tab === 'newest' }" @click="changeTab">Mới</a>
									</li>
								</ul>
								<div class="tab-content" id="">
									<div class="tab-pane fade show active" id="load_list" role="tabpanel" aria-labelledby="">
										<br>
										<div class="row">
											<ItemTag v-for="tag in tags" :key="tag.id" :tag="tag"></ItemTag>
										</div>
										<br>
                                    <Pagination v-if="pagination" :pagination="pagination" @paginate="paginate($event)" :offset="4"></Pagination>
									</div>
								</div>
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
                tab: 'popular',
                message:{},
                keyword: '',
                styleObject: {
				    display: 'none',
				  }	
            }
        },
        computed: {
            tags() {
                return this.$store.getters['tag/getListTag'].data;
            },
            pagination() {
                return this.$store.getters['tag/getListTag'].meta;
            }
        },
        methods: {
            changeTab() {
                this.tab = event.target.id;
                this.fetchListTag(this.tab);
            },
            paginate(page) {
                this.fetchListTag(this.tab, page)
            },
            fetchListTag(sort = 'popular', page = 1) {
                let payload = { 'sort': sort, 'page': page }
                this.$store.dispatch('tag/fetchListTag', payload);
            },
            searchTags() {
                let payload = {
                   
                    'keyword': this.keyword,
                }

                if(this.keyword.length == 0){
                    this.message['errorskeyword'] = 'Bạn chưa nhập key search!';
                    this.styleObject.display= 'block';
                }
                else{
                    this.$router.push({ name: 'search-tag', query: { keyword: this.keyword }});    
                }
            },
        },
        created() {
            this.fetchListTag();
        },
    }
</script>
