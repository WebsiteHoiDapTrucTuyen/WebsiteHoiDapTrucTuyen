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
use Session;

class AnswerController extends Controller
{
    // Admin
    public function getList($idQuestion) {
        $question = Question::find($idQuestion);
        $answers = $question->answers;
        return view('admin.answer.list', ['answers' => $answers, 'question' => $question]);
    }

    public function getDelete($idAnswer) {
        $answer = Answer::find($idAnswer);
        $commentsOfAnswer = $answer->comments;
        foreach ($commentsOfAnswer as $cmt) {
            $cmt->delete();  // Delete comments of answer
        }

        $answer->delete(); // Delete answer


        return redirect()->back()->with('thongbao', 'Xóa Thành Công');
    }

}
