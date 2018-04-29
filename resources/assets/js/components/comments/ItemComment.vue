<template>
    <div v-if="comment">
        <div class="media">
            <!--img media-->
            <div class="mr-3">
                <img :src="sourceImage(comment.user.avatar)" class="rounded-circle" width="30" height="30">
            </div>
            <!--body media-->
            <div class="media-body" style="font-size: 13px;">
                <div class="name-user-cmt">
                    <a href="">{{ comment.user.name }}</a>
                    <span class="text-muted">
                        đã bình luận vào {{ comment.date_comment.date }}
                    </span>
                </div>
                <div class="row" v-if="!isEdit">
                    <div class="col-lg-11">
                        <div class="break-word">
                            {{ comment.content }}
                        </div>
                    </div>
                    <!--col edit-->
                    <div class="col-lg-1" v-if="checkOwner">
                        <div class="dropdown-cmt">
                            <div id="dropdownMenuLink" data-toggle="dropdown">
                                <img src="/images/three_dots.png" height="10" width="20">
                            </div>

                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                <a class="dropdown-item" @click="edit(indexComment)">Chỉnh sửa...</a>
                                <a class="dropdown-item" >Xóa...</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" v-else>
                    <div class="col-lg-12">
                        <form accept-charset="utf-8">
                            <textarea id="content_new" class="form-control input-size" v-model="content"></textarea>
                            <div class="float-right">
                                <a @click="cancelEditComment()"><span style="color: red; font-size: 15px;" class="oi oi-circle-x mr-2"></span></a>
                                <a @click="editComment(type, comment.id, indexAnswer, indexComment)"><span style="color: green; font-size: 15px;" class="oi oi-circle-check"></span></a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <hr>
    </div>
</template>

<script>
    export default {
        props: {
            comment: {
                type: Object,
                require: true
            },
            type: {
                type: String,
                require: true
            },
            indexAnswer: {
                type: Number,
                require: true
            },
            indexComment: {
                type: Number,
                require: true
            },
            isEdit: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                content: this.comment.content,
            }
        },
        computed: {
            currentUser() {
                return this.$store.getters['user/getCurrentUser'].data
            },
            checkOwner() {
                return this.currentUser && this.comment.user.id === this.currentUser.id
            }
        },
        methods: {
            sourceImage(url) {
                return "/images/avatar_users/" + url;
            },
            edit(index) {
                this.$emit('edit', index)
            },
            delete() {

            },
            editComment(type, id, indexAnswer, indexComment) {
                let content = this.content.trim(); 
                if (content.length > 0) {
                    let payload = {
                        'id': id,
                        'data': {
                            'content': content
                        }
                    }
                    this.$store.dispatch('comment/fetchUpdateComment', payload)
                    .then(response => {
                        // console.log(response)
                        if (!response.data.hasOwnProperty('errors')) {
                            let payload = { 
                                'comment': response.data.data,
                                'indexAnswer': indexAnswer,
                                'indexComment': indexComment
                            }
                            this.$store.dispatch(type + '/editComment', payload)
                                .then( this.cancelEditComment() )
                        }
                    });
                }
            },
            cancelEditComment() {
                this.$emit('edit', null)
            },
            
        },
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>
