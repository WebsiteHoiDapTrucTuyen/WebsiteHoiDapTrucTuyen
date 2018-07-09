<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Auth;
use Validator;
use DateTime;
use Session;
use Carbon\Carbon;
use App\Permission;
use App\User;
use App\Tag;
use App\Question;
use App\Answer;
use App\Taggable;
use App\Documentation;
use App\Comment;
use App\Subject;
use App\Activity;
use App\Ping;
use App\Vote;
use App\PasswordReset;
use File;
use Hash;

class UserController extends Controller
{
    // Admin
    public function getList(){
        $Users = User::where('permission_id', 1)->get();
        return view('admin.user.list',['users'=>$Users]);
    }

    // Auth
    public function getLogin() {
        Auth::logout();   
        return view('admin.login');
    }

    public function postLogin(Request $request) {
        $validator = Validator::make($request->all(), 
            [
                'email' => 'required|email',
                'password' => 'required|min:6|max:32',
            ], 
            [
                'email.required' => 'Bạn chưa nhập email',
                'email.email' => 'Bạn chưa nhập đúng định dạng email',
                'password.required' => 'Bạn chưa nhập password',
                'password.min' => 'Mật khẩu phải có độ dài từ 6 đến 32 ký tự',
                'password.max' => 'Mật khẩu phải có độ dài từ 6 đến 32 ký tự',
            ]
        );
        if ($validator->fails()) {
            return redirect()->back()
                        ->withErrors($validator)
                        ->withInput();
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password, 'active' => true])) {
            return redirect('/admin');
        }
        else {
            return redirect()->back()->with('thongbao','Sai tên đăng nhập hoặc mật khẩu');
        }

    }

    
}
    