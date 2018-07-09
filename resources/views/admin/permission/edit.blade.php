@extends('admin.layout.master')

@section('body')
                <div id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header"><small>Chỉnh sửa quyền</small> {{ $permission->name }}</h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    @if (count($errors) > 0)
                                    <div class="alert alert-warning">
                                        @foreach ($errors->all() as $err)
                                        {{ $err }} <br>
                                        @endforeach
                                    </div>
                                    @endif
                                    @if (session('thongbao'))
                                    <div class="alert alert-success">
                                        {{ session('thongbao') }}
                                    </div>
                                    @endif
                                    <div class="tags-editor">
                                        <form action="admin/permission/edit/{{ $permission->id }}" method="POST" role="form">
                                            {{ csrf_field() }}
                                            <div class="form-group">
                                                <label>Tên</label>
                                                <input type="text" class="form-control" placeholder="Nhập tên quyền" value="{{ $permission->name }}" name="name">
                                            </div>
                                            <div class="form-group">
                                                <label>Key</label>
                                                <input type="number" class="form-control" placeholder="Nhập key quyền" value="{{ $permission->key }}" name="key">
                                            </div>
                                            <div class="form-group">
                                                <label>Ẩn/Hiện</label>
                                                <br>
                                                <label class="switch">
                                                    <input type="checkbox" name="active" 
                                                        @if ($permission->active)
                                                            {{ "checked" }}
                                                        @endif
                                                    >
                                                    <span class="slider round"></span>
                                                </label>
                                            </div>
                                            <button type="submit" class="btn btn-primary">Cập nhật quyền</button>
                                        </form>
                                    </div>
                                </div>
                                <!-- /.col-lg-6 (nested) -->
                            </div>
                            <!-- /.row (nested) -->
                        </div>
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel -->
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /#page-wrapper -->
@endsection

@section('css')
	<!-- Toggle Switch Checkbox   -->
    <link rel="stylesheet" type="text/css" href="admin_asset/css/toggle_switch.css">
@endsection

@section('script')
	<!-- Toggle Switch Checkbox -->
    <script src="admin_asset/js/toggle_switch.js"></script>
@endsection