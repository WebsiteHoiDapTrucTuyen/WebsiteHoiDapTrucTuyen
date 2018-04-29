<template>
    <!--create comment-->
    <div class="form-comment" v-if="checkAuthenticated">
        <div>
            <div class="form-group">
                <textarea class="form-control" placeholder="Viết bình luận của bạn..." rows="2" v-model="content" 
                @keyup.enter="addComment(type, id, index)"></textarea>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
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
                content: null
            }
        },
        computed: {
            checkAuthenticated() {
                return this.$store.getters['user/checkAuthenticated'].data
            },
        },
        methods: {
            addComment(type, id, index) {
                let content = this.content.trim(); 
                if (content.length > 0) {
                    let payload = {
                        'type': type,
                        'id': id,
                        'data': {
                            'content': content
                        }
                    }

                    this.$store.dispatch('comment/fetchStoreComment', payload)
                    .then(response => {
                        // console.log(response)
                        if (!response.data.hasOwnProperty('errors')) {
                            let payload = { 
                                'comment': response.data.data,
                                'index': index
                            }
                            this.$store.dispatch(this.type + '/addComment', payload)
                                .then( this.content = null )
                        }
                    });
                }
            }
        },
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>
