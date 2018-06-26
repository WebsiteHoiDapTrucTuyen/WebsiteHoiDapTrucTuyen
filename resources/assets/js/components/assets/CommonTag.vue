<template>
    <div class="tag-common">
        <div class="tag-common-header">
            <p>Tag Phổ Biến</p>
        </div>
        <hr>
        <div class="tag-common-list">
            <div class="tag-item" v-for="tag in common">
                <a href="">
                    <button class="btn btn-tag">
                     {{ tag.name }} <span class="badge badge-pill badge-primary">{{ tag.count }}</span>
                    </button>
                </a>
            </div>
        </div>
        <router-link :to="{ name: 'list-tag' }">Xem thêm ...</router-link>
    </div>
</template>

<script>
    export default {
        computed: {
            common() {
                return this.$store.getters['asset/getCommonTag'].data
            }
        },
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>
