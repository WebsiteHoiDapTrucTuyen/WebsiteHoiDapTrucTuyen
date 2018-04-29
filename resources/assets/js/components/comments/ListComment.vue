<template>
    <!--list comments-->
    <div id="list-comment">
        <ItemComment :comment="comment" :type="type" :indexComment="index" :indexAnswer="indexAnswer" :isEdit="checkEdit(index)" 
        @edit="editItemComment($event)"
        v-for="(comment, index) in comments" :key="comment.id" ></ItemComment>
    </div>
</template>

<script>
    import ItemComment from './ItemComment.vue'

    export default {
        components: {
            ItemComment: ItemComment
        },
        props: {
            comments: {
                type: Array,
                require: true
            },
            type: {
                type: String,
                require: true
            },
            indexAnswer: {    //only answer
                type: Number,
            }
        },
        data() {
            return {
                indexEditItemComment: null
            }
        },
        methods: {
            checkEdit(index) {
                return this.indexEditItemComment === index
            },
            editItemComment(index) {
                this.indexEditItemComment = index
            }
        },
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>
