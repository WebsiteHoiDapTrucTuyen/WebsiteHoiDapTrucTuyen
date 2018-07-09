<div class="navbar-default sidebar" role="navigation">
    <div class="sidebar-nav navbar-collapse">
        <ul class="nav" id="side-menu">
            <li class="sidebar-search">
                <div class="input-group custom-search-form">
                    <input type="text" class="form-control" placeholder="Tìm kiếm...">
                    <span class="input-group-btn">
                        <button class="btn btn-default" type="button">
                            <i class="fa fa-search"></i>
                        </button>
                    </span>
                </div>
                <!-- /input-group -->
            </li>
            <li>
                <a href="/admin"><i class="fa fa-dashboard fa-fw"></i> Dashboard</a>
            </li>
            <li>
                <a href="/admin/question/list"><i class="fa fa-question-circle fa-fw"></i> Quản lý câu hỏi</a>
            </li>
            {{-- <li>
                <a href="#"><i class="fa fa-reply fa-fw"></i> Quản lý câu trả lời<span class="fa arrow"></span></a>
                <ul class="nav nav-second-level">
                    <li>
                        <a href="/admin/answer/list">Danh sách câu trả lời</a>
                    </li>
                    <li>
                        <a href="/admin/answer/add">Thêm câu hỏi trả lời</a>
                    </li>
                </ul>
                <!-- /.nav-second-level -->
            </li> --}}
            <li>
                <a href="/admin/documentation/list"><i class="fa fa-file-text fa-fw"></i> Quản lý tài liệu</a>
            </li>
            <li>
                <a href="/admin/subject/list"><i class="fa fa-th-list fa-fw"></i> Quản lý chủ đề của tài liệu</a>
            </li>
            <li>
                <a href="/admin/tag/list"><i class="fa fa-tags fa-fw"></i> Quản lý thẻ</a>
            </li>
            <li>
                <a href="/admin/user/list"><i class="fa fa-users fa-fw"></i> Quản lý người dùng</a>
            </li>
            <li>
                <a href="/admin/permission/list"><i class="fa fa-certificate fa-fw"></i> Quản lý quyền</a>
            </li>
        </ul>
    </div>
    <!-- /.sidebar-collapse -->
</div>
<!-- /.navbar-static-side -->