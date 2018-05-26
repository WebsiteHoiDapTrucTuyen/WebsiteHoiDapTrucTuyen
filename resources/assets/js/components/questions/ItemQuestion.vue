<template>
    <div class="question-summary">
        <div class="row">
            <div class="statistic col-lg-4">
                <div class="count-views">
                    <span>{{ question.viewed }}</span>
                    <div>lượt xem</div>
                </div>
                <div class="count-answers">
                    <span>{{ question.answered }}</span>
                    <div>câu trả lời</div>
                </div>
                <div class="count-votes">
                    <span>{{ question.voted }}</span>
                    <div>bình chọn</div>
                </div>
            </div>
            <div class="summary col-lg-8 break-word">
                <div class="summary-title">
                    <div class="summary-title">
                        <h6>
                            <router-link :to="{ name: 'detail-question', params: { id: question.id } }">{{ question.title }}</router-link>

                        </h6>
                    </div>
                </div>
                <div class="row">
                 <div class="list-tag col-lg-7">
                    <a href="" v-for="tag in question.tags">
                        <p class="tag">{{ tag.name }}</p>
                    </a>
                </div>
                <div class="started col-lg-5">
                    <p class="user hide-text"><a href="">{{ question.user_last_interact.name }}</a></p>
                    <p class="action">{{ question.user_last_interact.interact }}</p>
                    <p class="time">{{ question.user_last_interact.date_interact.date | moment("DD-MM-YYYY") }}</p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        props: {
            question: {
                type: Object,
                require: true
            }
        },
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>
