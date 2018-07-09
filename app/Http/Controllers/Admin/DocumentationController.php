<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Auth;
use Validator;
use DateTime;
use Event;
use Session;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\Paginator;
use Illuminate\Pagination\LengthAwarePaginator;
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


class DocumentationController extends Controller
{
    //Admin
    public function getList(){
        $documents = Documentation::all();
        return view('admin.documentation.list',['documents'=>$documents]);
    }

    public function getDelete($idDocument){
        $document = Documentation::find($idDocument);
        $comments = $document->comments;
        //
        foreach($comments as $cmt){
            $cmt->delete();
        }
        //
        foreach ($document->tags as $tag) {
            Taggable::where([
                ['taggable_id', $tag->pivot->taggable_id], 
                ['tag_id', $tag->pivot->tag_id]
            ])->delete();
        }
        $document->delete();

        return redirect()->back()->with('thongbao', 'Xóa Thành Công');
    }

}
