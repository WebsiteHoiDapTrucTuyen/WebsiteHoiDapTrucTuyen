<template>
    <div class="content-card" v-if="answers">
        <div class="action-answer">
            (<strong>{{ pagination.total }}</strong>) câu trả lời -
            <a href="">Thêm câu trả lời</a>
        </div>
        <hr>
        <ListAnswer :answers="answers"></ListAnswer>
        <Pagination :pagination="pagination" @paginate="paginate($event)" :offset="4"></Pagination>
        <CreateAnswer :id="id"></CreateAnswer>
    </div>
</template>

<script>
    import ListAnswer from './ListAnswer.vue'
    import CreateAnswer from './CreateAnswer.vue'
    import Pagination from '../assets/Pagination.vue'

    export default {
        components: {
            ListAnswer: ListAnswer,
            CreateAnswer: CreateAnswer,
            Pagination: Pagination,
        },
        props: {
            id: {
                type: Number,
                require: true
            }
        },
        computed: {
            answers() {
                return this.$store.getters['answer/getListAnswer'].data
            },
            pagination() {
                return this.$store.getters['answer/getListAnswer'].meta
            },
        },
        methods: {
            paginate(page) {
                this.fetchListAnswer(this.$route.params.id, page)
            },
            fetchListAnswer(id, page = 1) {
                let payload = { 'id': id, 'page': page }
                this.$store.dispatch('answer/fetchListAnswer', payload);
            },
        },
        watch: {
            '$route' (to, from) {
                this.fetchListAnswer(to.params.id)
            }
        },
        created() {
            this.fetchListAnswer(this.$route.params.id)
        },
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>
