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

class CommentController extends Controller
{
    // Admin
    public function getDelete($idComment) {
        $comment = Comment::find($idComment);
        
        $comment->delete();

        return redirect()->back()->with('thongbao_comment', 'Xóa Thành Công');
    }

}
