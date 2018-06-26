<template>
    <div class="rank-reputation" v-if="leaderboard">
        <div class="rank-header">
            <h4>Bảng xếp hạng</h4>
        </div>
        <hr>
        <div class="rank-items">
            <a href="" style="color: black;text-decoration: none;" v-for="user, index in leaderboard">
                <div class="row item">
                    <div class=" col-lg-4">
                        <span class="oi oi-star" style="color: #DFDF39;"></span>
                        <span>{{ index + 1 }}</span>
                    </div>
                    <div class="col-lg-2 ava">
                        <img :src="sourceImage(user.avatar)" class="rounded-circle" width="30" height="30">
                    </div>
                    <div class=" col-lg-6 hide-text">
                        {{ user.name }}
                    </div>
                    <div class=" float-right col-lg-1 point">
                        <strong>{{ user.point }}</strong>
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            leaderboard() {
                return this.$store.getters['asset/getLeaderboard'].data
            }
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
