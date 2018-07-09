<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Auth;
use Validator;
use DateTime;
use Session;
use Event;
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

class QuestionController extends Controller
{
    // Admin
    public function getList() {
        $questions = Question::all();
        return view('admin.question.list', ['questions' => $questions]);
    }

    public function getDelete($idQuestion) 
    {
       $question = Question::find($idQuestion);
       // Delete all comment of question
       $commentsOfQuestion = $question->comments;
       foreach ($commentsOfQuestion as $cmt) {
           $cmt->delete();  // Delete comments of question
       }
       // Delete all answer of question
       $answers = $question->answers;
       foreach ($answers as $ans) {
           $commentsOfAnswer = $ans->comments;
           foreach ($commentsOfAnswer as $cmt) {
               $cmt->delete();  // Delete comments of question
           }
           $ans->delete(); // Delete answers of question
       }
       // Delete all taggable of question
       foreach ($question->tags as $tag) {
           Taggable::where([
               ['taggable_id', $tag->pivot->taggable_id], 
               ['tag_id', $tag->pivot->tag_id]
           ])->delete();
       }

       $question->delete(); // Delete question

       return redirect()->back()->with('thongbao', 'Xóa Thành Công');
   }

    
   
}
