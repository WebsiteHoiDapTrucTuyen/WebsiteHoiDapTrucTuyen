<template>
    <div class="rank-reputation" v-if="leaderboard">
        <div class="rank-header">
            <h4>Bảng xếp hạng</h4>
        </div>
        <hr>
        <div class="rank-items">
            <a href="" style="color: black;text-decoration: none;" v-for="user, index in leaderboard">
                <div class="item">
                    <div class="d-inline" style="">
                        <span class="oi oi-star" style="color: #DFDF39;"></span>{{ index + 1 }}
                    </div>
                    <div class="d-inline">
                        <img :src="sourceImage(user.avatar)" class="rounded-circle" width="30" height="30">
                    </div>
                    <div class="d-inline">
                        {{ user.name }}
                    </div>
                    <div class="d-inline float-right">
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
