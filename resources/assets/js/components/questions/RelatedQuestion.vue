<template>
    <div class="content-card" v-if="related">
        <div class="question-related">
            <div class="related-header">
                <p>Câu hỏi liên quan</p>
            </div>
            <hr>
            <div class="related-content">
                <div class="related-question" v-for="question in related">
                    <div class="row">
                        <div class="col-lg-3 related-question-left non-answered-accepted" :class="{ 'answered-accepted': question.best_answer }">
                            {{ question.voted }}
                        </div>
                        <div class="col-lg-9 hide-text">
                            <router-link :to="{ name: 'detail-question', params: { id: question.id } }">{{ question.title }}</router-link>
                            <!-- <a href="" @click=changeQuestion(question.id)>{{ question.title }}</a> -->
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
                return this.$store.getters['question/getRelatedQuestion'].data
            },
        },
        methods: {
            changeQuestion(id) {
                this.$router.push({ name: 'detail-question', params: { id: id } })
            },
            fetchRelatedQuestion(id) {
                let payload = { 'id': id }
                this.$store.dispatch('question/fetchRelatedQuestion', payload)
            }
        },
        watch: {
            '$route' (to, from) {
                this.fetchRelatedQuestion(to.params.id)
            }
        },
        created() {
            this.fetchRelatedQuestion(this.$route.params.id)
        },
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>
