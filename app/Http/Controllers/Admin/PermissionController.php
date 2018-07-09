<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Auth;
use Validator;
use DateTime;
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

class PermissionController extends Controller
{
    // Admin
    public function getList() {
    	$permissions = Permission::all();
    	return view('admin.permission.list', ['permissions' => $permissions]);
    }

}
