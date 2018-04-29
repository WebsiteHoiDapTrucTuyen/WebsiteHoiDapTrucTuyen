<template>
    <div class="add-answer" v-if="checkAuthenticated">
        <form>
            <h2>Câu trả lời của bạn</h2>
            <br>
            <h5>Bạn có thể trả lời câu hỏi này? Hãy chia sẻ nó cho mọi người.</h5>
            <div class="form-group">
                <tinymce id="tinymce" v-model="content"></tinymce>
            </div>
            <button id="btn-submit-new-answer" type="submit" class="btn btn-primary" style="padding: 10px 50px;">Trả lời</button>
        </form>
    </div>
</template>

<script>
    export default {
        props: {
            id: {
                type: Number,
                require: true
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

        },
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>
