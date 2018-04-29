<template>
    <div class="comments-container">
        <a href="" style="pointer-events: none;">({{ comments.length }}) bình luận cho câu hỏi này</a><br><br>
        <CreateComment :id="id" :type="type" :index="index"></CreateComment>
        <ListComment :comments="comments" :type="type" :indexAnswer="index"></ListComment>
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
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>
