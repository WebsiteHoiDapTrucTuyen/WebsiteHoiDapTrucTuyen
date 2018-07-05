<template>
    <div>
        <Navbar></Navbar>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>

<script>
    import Navbar from './components/layouts/Navbar.vue';
    import Footer from './components/layouts/Footer.vue';

    export default {
        components: {
            Navbar: Navbar,
            Footer: Footer,
        },
        created() {
            this.$auth.setAuthorizationHeader()
            this.$store.dispatch('asset/fetchInformationQuestion')
            this.$store.dispatch('asset/fetchLeaderboard')
            this.$store.dispatch('asset/fetchCommonTag')
        },
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>
