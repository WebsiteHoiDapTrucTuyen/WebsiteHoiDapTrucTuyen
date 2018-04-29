<template>
    <div class="answer">
        <div class="row">
            <div class="col-lg-1">
                <div class="detail-left">
                    <div class="avatar-circle d-flex justify-content-center">
                        <img :src="sourceImage(answer.user_owner.avatar)" class="rounded-circle" width="40" height="40">
                    </div>
                    <div class="vote-widget">
                        <div class="vote-up d-flex justify-content-center">
                            <span id="up" class="oi oi-caret-top" style="display: block;"></span>
                        </div>
                        <div id="point-answer" class="vote-count d-flex justify-content-center">
                            {{ answer.voted }}
                        </div>
                        <div class="vote-down d-flex justify-content-center">
                            <span id="down" class="oi oi-caret-bottom" style="display: block;"></span>
                        </div>
                    </div>
                    <div class="best-answer-widget d-flex justify-content-center">
                        <span class="oi oi-check best-answer-normal" v-if="answer.best_answer"></span>
                    </div>
                </div>
            </div>
            <div class="col-lg-11 break-word">
                <div class="detail-right">
                    <div class="avatar-name">
                        <a href="">{{ answer.user_owner.name }}</a> <span class="text-muted mr-3">
                            đã trả lời vào {{ answer.date_answer.date }}
                        </span>
                    </div>
                    <div id="answer" class="answer-detail-content">
                        <div v-html="answer.content">

                        </div>
                    </div>
                    <!-- <div>
                        <a href="" style="border-right: solid 1px black; padding-right: 10px;">Chỉnh sửa</a>
                        <a href="" style=" padding-left: 5px" onclick="return confirm('Bạn có chắc là muốn xóa không?')">Xóa</a>
                    </div> -->
                    <br><br>
                    <Comment :comments="answer.comments" :id="answer.id" :type="'answer'" :index="index"></Comment>
                </div>
            </div>
        </div>
        <hr>
    </div>
</template>

<script>
    import Comment from '../comments/Comment.vue'

    export default {
        components: {
            Comment: Comment
        },
        props: {
            answer: {
                type: Object,
                require: true
            },
            index: {
                type: Number,
                require: true
            }
        },
        computed: {
            currentUser() {
                return this.$store.getters['user/getCurrentUser'].data
            },
        },
        methods: {
            sourceImage(url) {
                return "/images/avatar_users/" + url;
            },
        },
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>
