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
                this.$store.dispatch('answer/fetchListAnswer', payload)
                .then(response => {
                    for (let index = 0; index < response.data.data.length; index++) {
                        this.receiveCommentBroadcast('answer', response.data.data[index].id, index)
                    }
                });
            },
            receiveCommentBroadcast(type, id, index) {
                Echo.channel(`${type}.${id}.comments`)
                .listen('CommentBroadcast', e => {
                    let payload = {
                        comment: e.comment,
                        indexAnswer: index,
                        indexComment: this.answers[index].comments.findIndex(el => el.id == e.comment.id)
                    }
                    this.$store.dispatch(type + '/' + e.action, payload)
                });
            }
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
