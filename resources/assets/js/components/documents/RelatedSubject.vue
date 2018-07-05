<template>
	<div class="content-card">
		<div class="documentation-related">
			<div class="related-header">
				<p>Chủ đề: <br> {{ subject.name }}</p>
			</div>
			<hr>
			<div class="related-content">
				<div class="related-documentation"  v-for="document in related">
					<div class="row">
						<div class="col-lg-3 non-answered-accepted related-documentation-left">
							{{ document.voted }}

						</div>
						<div class="col-lg-9 hide-text">
                            <router-link :to="{ name: 'detail-document', params: { id: document.id } }">{{ document.title }}</router-link>
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
        props: ['subject'],  
        computed: {
            related() {
                return this.$store.getters['documentation/getRelatedSubject'].data
            },
        },
        methods: {
            changeDocument(id) {
                this.$router.push({ name: 'detail-document', params: { id: id } })
            },
            fetchRelatedSubject(id) {
                let payload = { 'id': id }
                this.$store.dispatch('documentation/fetchRelatedSubject', payload)
            }
        },
        watch: {
            '$route' (to, from) {
                this.fetchRelatedSubject(to.params.id)
            }
        },
        created() {
            this.fetchRelatedSubject(this.$route.params.id)
        }
    }
</script>