 <template>
    <div class="count-questions" v-if="information">
        <div class="stats-container">
            <div class="row">
                <div class="stats">
                    <span>{{ information.questions }}</span>
                    <div>câu hỏi</div>
                </div>
                <div class="stats">
                    <span>{{ information.answers }}</span>
                    <div>câu trả lời</div>
                </div>
                <div class="stats">
                    <span>{{ information.comments }}</span>
                    <div>bình luận</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            information() {
                return this.$store.getters['asset/getInformationQuestion'].data;
            }
        },
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>
