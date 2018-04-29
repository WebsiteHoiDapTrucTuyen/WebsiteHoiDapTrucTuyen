<template>
    <div class="list-answer">
        <ItemAnswer v-for="(answer, index) in answers" :key="answer.id" :answer="answer" :index="index"></ItemAnswer>
    </div>
</template>

<script>
    import ItemAnswer from './ItemAnswer.vue'

    export default {
        components: {
            ItemAnswer: ItemAnswer
        },
        props: {
            answers: {
                type: Array,
                require: true
            },
        },
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>
