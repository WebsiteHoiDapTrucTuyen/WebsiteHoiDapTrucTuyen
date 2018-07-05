<template>
    <div class="comments-container">
        <a v-if="unlimited > 0" href="" @click.prevent="showMore()">Xem thêm {{ unlimited }} bình luận <!-- cho câu hỏi này --></a>
        <ListComment :comments="comments.slice(generateShowItem(multily))" :type="type" :indexAnswer="index"></ListComment>
        <br><br>
        <CreateComment :id="id" :type="type" :index="index"></CreateComment>
    </div>
</template>

<script>
    import ListComment from './ListComment.vue'
    import CreateComment from './CreateComment.vue'

    export default {
        components: {
            CreateComment: CreateComment,
            ListComment: ListComment
        },
        props: {
            comments: {
                type: Array,
                require: true
            },
            id: {
                type: Number,
                require: true
            },
            type: {
                type: String,
                require: true
            },
            index: {    //only answer
                type: Number,
            }
        },
        data() {
            return {
                multily: 1,
                unlimited: this.comments.length - 10
            }
        },
        methods: {
            generateShowItem(multily) {
                let total = this.comments.length;
                let limited = total - 10 * multily;
                if (limited < 0) {
                    this.unlimited = 0;
                    return 0;
                }
                return limited;
            },
            showMore() {
                this.multily = this.multily + 1;
                this.unlimited = this.unlimited - 10;
            }
        },
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>
