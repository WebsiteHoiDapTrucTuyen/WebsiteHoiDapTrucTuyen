<template>
    <nav>
        <ul class="pagination justify-content-center">
            <li class="page-item" v-if="pagination.current_page > 1">
              <a class="page-link" href="" aria-label="Previous" v-on:click.prevent="changePage(pagination.current_page - 1)">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
                </a>
            </li>
            <li class="page-item" v-for="page in pagesNumber" :class="{'active': page == pagination.current_page}">
                <a class="page-link" href="" v-on:click.prevent="changePage(page)">{{ page }}</a>
            </li>
            <li class="page-item" v-if="pagination.current_page < pagination.last_page">
              <a class="page-link" href="" aria-label="Next" v-on:click.prevent="changePage(pagination.current_page + 1)">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        props: {
            pagination: {
                type: Object,
                required: true
            },
            offset: {
                type: Number,
                default: 4
            }
        },
        computed: {
            pagesNumber() {
                if (!this.pagination.to) {
                    return [];
                }
                let from = this.pagination.current_page - this.offset;
                if (from < 1) {
                    from = 1;
                }
                let to = from + (this.offset * 2);
                if (to >= this.pagination.last_page) {
                    to = this.pagination.last_page;
                }
                let pagesArray = [];
                for (let page = from; page <= to; page++) {
                    pagesArray.push(page);
                }
                return pagesArray;
            }
        },
        methods : {
            changePage(page) {
                this.$router.replace({ query: { page: page }});    
                this.$emit('paginate', page);
            }
        },
        created() {
            let currentPage = +this.$route.query.page;
            if (currentPage) {
                this.changePage(currentPage);
            }
            
        },
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>
