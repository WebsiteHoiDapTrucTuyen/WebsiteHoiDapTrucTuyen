<template>
    <div>
        <Banner></Banner>
        <router-view></router-view>
    </div>
</template>

<script>
    import Banner from '../assets/Banner.vue'
    export default {
        components: {
            Banner: Banner
        },
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>
