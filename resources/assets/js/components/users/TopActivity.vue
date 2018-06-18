<template>
    <!--active-->
    
    <!--end active-->
    <div class="row">
        <div class="col-lg-12">
            <div class="main-content">
                <div class="content-card">
                    <div id="active_user">
                        <div class="Hoat-Dong" style="border-bottom: none;">
                            <p class="text-muted" style="border-bottom: solid #E8E8E8 1px;">Hoạt Động</p>
                            <div>
                                <p>Câu hỏi: {{ data.count_question }}</p>
                                <p>Câu trả lời: {{ data.count_answer }}</p>
                                <p>Tài liệu: {{ data.count_documentation }}</p>

                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 break-word">
                                <div>
                                    <div class="border_active">
                                        <strong>TOP Câu hỏi</strong>
                                        <div class="float-right">
                                            <a href="" @click.prevent="showMore()">Xem thêm...</a>          
                                        </div>
                                    </div>
                                    <div class="user_active" v-for="qs in data.top_question">
                                        <p class="point non-answered-accepted" :class="{ 'answered-accepted': qs.best_answer }" >{{ qs.voted }}</p>
                                        <router-link :to="{ name: 'detail-question', params: { id: qs.id } }">{{ qs.title }}</router-link>
                                        <p class=" date float-right text-muted">{{ qs.date.date | moment("DD-MM-YYYY") }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-12 break-word">
                                <div>
                                    <div class="border_active">
                                        <strong>TOP Câu trả lời</strong>
                                        <div class="float-right">
                                            <a href="" @click.prevent="showMore()">Xem thêm...</a>          
                                        </div>
                                    </div>
                                    <div class="user_active" v-for="ans in data.top_answer">
                                        <p class="point non-answered-accepted" :class="{ 'answered-accepted': ans.best_answer }" >{{ ans.voted }}</p>
                                        <router-link :to="{ name: 'detail-question', params: { id: ans.id } }">{{ ans.title }}</router-link>                            
                                        <p class=" date float-right text-muted">{{ ans.date.date | moment("DD-MM-YYYY") }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-12 break-word">
                                <div>
                                    <div class="border_active">
                                        <strong>TOP Tài liệu</strong>
                                        <div class="float-right">
                                            <a href="" @click.prevent="showMore()">Xem thêm...</a>          
                                        </div>
                                    </div>
                                    <div class="user_active" v-for="doc in data.top_documentation">
                                        <p class="point non-answered-accepted" :class="{ 'answered-accepted': doc.best_answer }" >{{ doc.voted }}</p>
                                        <router-link :to="{ name: 'detail-documentation', params: { id: doc.id } }">{{ doc.title }}</router-link>                            
                                        <p class=" date float-right text-muted">{{ doc.date.date | moment("DD-MM-YYYY") }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        computed: {

        },
        methods: {
            showMore() {
                this.$emit('changeActivity', 'AllActivity')
            }
        },
        created() {

        },
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>
