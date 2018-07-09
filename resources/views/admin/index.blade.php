@extends('admin.layout.master')

@section('body')
        <div id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Dashboard</h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            <div class="row">
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-question-circle fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge">{{ $new_question }}</div>
                                    <div>Câu hỏi mới</div>
                                </div>
                            </div>
                        </div>
                        <a href="admin/question/list">
                            <div class="panel-footer">
                                <span class="pull-left">Chi tiết</span>
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                <div class="clearfix"></div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-green">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-file-text fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge">{{ $new_documentation }}</div>
                                    <div>Tài liệu mới</div>
                                </div>
                            </div>
                        </div>
                        <a href="admin/documentation/list">
                            <div class="panel-footer">
                                <span class="pull-left">Chi tiết</span>
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                <div class="clearfix"></div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-yellow">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-tags fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge">{{ $new_tag }}</div>
                                    <div>Thẻ mới</div>
                                </div>
                            </div>
                        </div>
                        <a href="admin/tag/list">
                            <div class="panel-footer">
                                <span class="pull-left">Chi tiết</span>
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                <div class="clearfix"></div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-red">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-users fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge">{{ $new_user }}</div>
                                    <div>Người dùng mới</div>
                                </div>
                            </div>
                        </div>
                        <a href="admin/user/list">
                            <div class="panel-footer">
                                <span class="pull-left">Chi tiết</span>
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                <div class="clearfix"></div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <!-- /.row -->
        </div>
        <!-- /#page-wrapper -->
@endsection

@section('css')
	{{-- expr --}}
@endsection

@section('script')
	<script type="text/javascript">
        $(document).ready(function() {
            $('ul.chat').on("click", "li" ,function() {
                $(this).find("p.new").fadeOut("slow");
                var type = "activity";
                var id = $(this).find("div.id").html();
                $.get("admin/ajax/dismissNew/" + type + "/" + id, function() {

                });
            });
        }); 
    </script>
@endsection