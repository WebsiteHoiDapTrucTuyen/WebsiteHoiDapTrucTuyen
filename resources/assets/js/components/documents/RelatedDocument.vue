<template>
	<div class="content-card">
		<div class="documentation-related">
			<div class="related-header">
				<p>Tài liệu liên quan</p>
			</div>
			<hr>
			<div class="related-content">
				<div class="related-documentation" v-for="document in related">
					<div class="row">
						<div class="col-lg-3 non-answered-accepted related-documentation-left">
							{{ document.voted }}
						</div>
						<div class="col-lg-9 hide-text">
							<a href="" @click=changeDocument(document.id)>{{ document.title }}</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
    export default {
        computed: {
            related() {
                return this.$store.getters['documentation/getRelatedDocumentation'].data
            },
        },
        methods: {
            changeDocument(id) {
                this.$router.push({ name: 'detail-document', params: { id: id } })
            },
            fetchRelatedDocument(id) {
                let payload = { 'id': id }
                this.$store.dispatch('documentation/fetchRelatedDocumentation', payload)
            }
        },
        created() {
            this.fetchRelatedDocument(this.$route.params.id)
        },
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>
