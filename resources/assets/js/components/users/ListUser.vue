<template>
	<div class="content">
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<div class="main-content">
						<div class="content-card">
							<div class="tabs">
								<h4 class="topquestion d-inline-block">Người Dùng</h4>
								<br>
								<br>
								<div class="row">
									<div class="col-lg-6">
										<form id="form-search" action="" method="GET">
											<div class="input-group">
												<input id="key_search" type="text" class="form-control" name="keyword" placeholder="Nhập từ khóa cần tìm" >
												<span class="input-group-btn" >
													<button id="btn-search" type="button" class="btn btn-success">Tìm kiếm</button>
												</span>
											</div>
										</form>
									</div>
								</div>
								<br>
								<ul class="nav nav-tabs d-flex justify-content-end" id="UsersTab" role="tablist">
									<li class="nav-item">
										<a class="nav-link" id="point" :class="{ active: tab === 'point' }" @click="changeTab">Điểm</a>
									</li>
									<li class="nav-item">
										<a class="nav-link" id="name" :class="{ active: tab === 'name' }" @click="changeTab">Tên</a>
									</li>
									<li class="nav-item">
										<a class="nav-link" id="newest" :class="{ active: tab === 'newest' }" @click="changeTab">Mới</a>
									</li>
								</ul>
								<div class="tab-content" id="">
									<div class="tab-pane fade show active" id="load_list" role="tabpanel">
										<br>
										<div class="row">
											<ItemUser v-for="user in users" :key="user.id" :user="user"></ItemUser>
										</div>
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
                tab: 'point'
            }
        },
        computed: {
            users() {
                return this.$store.getters['listuser/getListUser'].data;
            },
            pagination() {
                return this.$store.getters['listuser/getListUser'].meta;
            }
        },
        methods: {
            changeTab() {
                this.tab = event.target.id;
                this.fetchListUser(this.tab);
            },
            paginate(page) {
                this.fetchListUser(this.tab, page)
            },
            fetchListUser(sort = 'point', page = 1) {
                let payload = { 'sort': sort, 'page': page }
                this.$store.dispatch('listuser/fetchListUser', payload);
            },
        },
        created() {
            this.fetchListUser();
        },
    }
</script>
