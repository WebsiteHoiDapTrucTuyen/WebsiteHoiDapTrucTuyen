<template>
	<div class="content" v-if="documentation">
		<div class="container">
			<div class="row">
				<div class="col-lg-9">
					<div class="main-content">
						<div class="content-card">
							<div class="row">
								<div class="col-lg-1">
									<div class="detail-left">
										<div class="documentation-favorite-point">
											<p id="point-documentation">{{ documentation.voted }}</p>
											<span id="favorite"  class="oi oi-heart" style="display: block;"></span>
										</div>
									</div>
								</div>
								<div class="col-lg-11">
									<div class="detail-right">
										<div class="documentation-title">
											<p>{{ documentation.title }}</p>
										</div>
										<div class="list-tag">
											<a href="" v-for="tag in documentation.tags">
												<div class="tag">
													{{ tag.name }}
												</div>
											</a>
										</div>
										<br>
										<br>
										<div v-if="checkOwner">
											<router-link :to="{ name: 'edit-document', params: { id: documentation.id } }" style="text-decoration: none;">
											<a style="border-left: solid 1px black; padding-left: 10px; border-right: solid 1px black; padding-right: 10px;"> Chỉnh sửa</a>
										</router-link>
											<a @click="deleteEntry()" style=" padding-left: 5px; border-right: solid 1px black; padding-right: 10px; color:red;cursor: pointer;">Xóa</a>
										</div>
										
									</div>
								</div>
							</div>
							<hr>
							<div class="documentation-content">
								<div v-html="documentation.content"></div>
								<br>
								<br>
								<br>
								<div style="border-left: solid orange 10px;" class="alert alert-warning" role="alert">
									<strong>Link:</strong> <a :href="documentation.link" target="_blank">{{ documentation.link }}</a>
								</div>
							</div>

							<br>
							<br>
							<br>

						</div>
						<div class="content-card">
							<br>
							<div class="comments-container">
								<!--list comments-->
								<Comment :comments="documentation.comments" :id="documentation.id" :type="'documentation'"></Comment>
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
						<div class="content-card">
							<div class="documentation-author">
								<div class="profile-card">
									<div class="profile-card-header">
										<div class="profile-card-title">
											{{ documentation.user.name }}
										</div>
										<div class="profile-card-separator">

										</div>
										<div class="profile-card-description">
											{{ documentation.user.job }}
										</div>
									</div>

									<div class="profile-card-footer">
										{{ documentation.user.point }}
										<span class="oi oi-star"></span>
									</div>
									<div class="profile-card-avatar">
										<img :src="sourceImage(documentation.user.avatar)" class="rounded-circle" width="80" height="80">
									</div>
								</div>

								<div class="legend-hr-text">
									<hr class="legend-hr">

								</hr>
								<div class="legend-text">
									THÔNG TIN TÀI LIỆU
								</div>
							</div>
							<div class="info-content">
								<div class="info-content-release">
									<div class="row">
										<div class="col-lg-5 info-content-left">
											<p>Đã đăng</p>
										</div>
										<div class="col-lg-7 .info-content-right" style="text-align: right;">
											<p>{{ documentation.date.date | moment("DD-MM-YYYY") }}</p>
										</div>
									</div>
								</div>
								<div class="info-content-viewed">
									<div class="row">
										<div class="col-lg-5 info-content-left">
											<p>Đã xem</p>
										</div>
										<div class="col-lg-7 .info-content-right" style="text-align: right;">
											<p>{{ documentation.viewed }} lần</p>
										</div>
									</div>
								</div>
								<div class="info-content-comment">
									<div class="row">
										<div class="col-lg-5 info-content-left">
											<p>Bình luận</p>
										</div>
										<div class="col-lg-7 .info-content-right" style="text-align: right;">
											<p>{{ documentation.comments.length }} lượt</p>
										</div>
									</div>
								</div>

								</div>
							</div>
						</div>
							
						<RelatedDocument></RelatedDocument>
						<RelatedSubject :subject="documentation.subject"></RelatedSubject>

					</div>
				</div>
			</div>
		</div>
		<sweet-modal icon="warning" title="Cảnh báo" ref="modalDelete">
            Bạn chắc chắn muốn xóa tài liệu này?
            <button class="btn btn-success" style="margin: 20px 20px" @click="deleteDocumentation(documentation.id)">Đồng ý</button>
            <button class="btn btn-danger" style="margin: 20px 20px" @click="cancelDeleteDocumentation()">Hủy bỏ</button>
        </sweet-modal>
	</div>
</template>
<script>
    import RelatedDocument from './RelatedDocument.vue'
    import RelatedSubject from './RelatedSubject.vue'
    import Comment from '../comments/Comment.vue' 
    import { SweetModal } from 'sweet-modal-vue'   

    export default {
        components: {
            RelatedDocument: RelatedDocument,
            RelatedSubject: RelatedSubject,
            Comment: Comment,
            SweetModal
        },
        computed: {
            documentation() {
                return this.$store.getters['documentation/getDetailDocumentation'].data;
            },
            currentUser() {
                return this.$store.getters['user/getCurrentUser'].data
            },
            checkOwner() {
                return this.currentUser && this.documentation.user.id === this.currentUser.id
            },
        },
        methods: {
            sourceImage(url) {
                return "/images/avatar_users/" + url;
            },
            fetchDetailDocumentation(id) {
                let payload = { 'id': id }
                this.$store.dispatch('documentation/fetchDetailDocumentation', payload)
            },
            deleteEntry() {
                this.$refs.modalDelete.open()
            },
            cancelDeleteDocumentation() {
                this.$refs.modalDelete.close()
            },
            deleteDocumentation(id) {
                let payload = {
                    'id': id,
                }
                this.$store.dispatch('documentation/fetchDeleteDocumentation', payload)
                .then(response => {
                	 //console.log(response.data.hasOwnProperty('errors'))
                    if (!response.data.hasOwnProperty('errors')) {
                        this.cancelDeleteDocumentation()
                        this.$router.push({ name: 'list-document' });
                    }
                    else {
                        this.cancelDeleteDocumentation()
                        this.message = 'Không thể thực hiện thao tác. Vui lòng thử lại sau'
                        this.$refs.modal.open()
                    }
                });
            }
        },
        created() {
            this.fetchDetailDocumentation(this.$route.params.id)
        },
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>