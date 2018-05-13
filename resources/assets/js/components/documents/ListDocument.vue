<template>
    <!-- Content -->
    <div class="content">
        <div class="container">
            <div class="row">
                <div class="col-lg-9">
                    <div class="main-content">
                        <div class="content-card">
                            <div class="content-list">
                                <h4 class="topquestion d-inline-block">Tất Cả Tài Liệu</h4>
                                <hr>

                                <form id="form-search" action="" method="GET">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="input-group">
                                                <input id="key_search" type="text" class="form-control" name="keyword" placeholder="Nhập từ khóa cần tìm" >
                                                <span class="input-group-btn" >
                                                    <button id="btn-search" type="button" class="btn btn-success">Tìm kiếm</button>
                                                    <button class="btn btn-secondary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                                        Nâng cao
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="collapse" id="collapseExample">
                                        <div class="row">
                                            <div class="col-lg-3">
                                                <select class="form-control" name="subject">
                                                    <option value="0">--- Chủ đề ---</option>
                                                    <!-- @foreach ($subjects as $sj)
                                                    <option value="{{ $sj->id }}" >
                                                        {{ $sj->name }}
                                                    </option>
                                                    @endforeach -->
                                                </select>
                                            </div>
                                            <div class="col-lg-9">
                                                <input class="form-control" type="text" name="" placeholder="Thẻ của tài liệu"  data-role="tagsinput">
                                                <input type="text" id="list-tag" hidden="" name="list_tag" value="0" >
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                
                                <div class="tabs">
                                    <ul class="nav nav-tabs d-flex justify-content-end" id="TagsTabContent" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" id="new" href="" role="tab">Mới Nhất</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="view" href="" role="tab">Lượt Xem</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="favorite" href="" role="tab">Yêu thích</a>
                                        </li>
                                    </ul>
                                    <div class="tab-content" id="">

                                            <ItemDocument></ItemDocument>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="sub-content" >
                        <div class="btn-documentation">
                            <a style="text-decoration: none;" href=""><button type="button" class="btn btn-success btn-block btn-lg">Chia sẻ tài liệu ngay !!!</button></a>
                        </div>
                        <!--rank-tag-->
                        <LeaderBoard></LeaderBoard>
                        <CommonTag></CommonTag>
                        <!--endrank-tag-->
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    <!-- end Content -->
</template>

<script>
    import ItemDocument from './ItemDocument.vue'
    import Pagination from '../assets/Pagination.vue'
    import InformationQuestion from '../assets/InformationQuestion.vue'
    import LeaderBoard from '../assets/LeaderBoard.vue'
    import CommonTag from '../assets/CommonTag.vue'

    export default {
        components: {
            ItemDocument: ItemDocument,
            Pagination: Pagination,
            InformationQuestion: InformationQuestion,
            LeaderBoard: LeaderBoard,
            CommonTag: CommonTag
        },
        
    }
</script>
