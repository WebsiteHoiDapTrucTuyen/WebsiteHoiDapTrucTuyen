<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Auth;
use Validator;
use DateTime;
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

class AjaxController extends Controller
{
	public function getCommentsOfQuestion($idQuestion) {
		$question = Question::find($idQuestion);
		if ($question != null) {
			$comments = $question->comments->sortByDesc('created_at');
			return view('admin.comment.list', ['comments' => $comments]);
		}
	}

	public function getCommentsOfDocument($idDocument) {
		$document = Documentation::find($idDocument);
		if ($document != null) {
			$comments = $document->comments->sortByDesc('created_at');
			return view('admin.comment.list', ['comments' => $comments]);
		}
	}
				

	public function getCommentsOfAnswer($idAnswer) {
		$answer = Answer::find($idAnswer);
		if ($answer != null) {
			$comments = $answer->comments->sortByDesc('created_at');
			return view('admin.comment.list', ['comments' => $comments]);
		}
	}

	public function changeActive($type, $id, $value) {
		$object;
		switch ($type) {	//1: answer, 2:documentation, 3:permission, 4:question, 5:subject, 6:tag, 7:user, 8:comment
			case 1:
				$object = Answer::find($id);
				break;
			case 2:
				$object = Documentation::find($id);
				break;
			case 3:
				$object = Permission::find($id);
				break;
			case 4:
				$object = Question::find($id);
				break;
			case 5:
				$object = Subject::find($id);
				break;
			case 6:
				$object = Tag::find($id);
				break;
			case 7:
				$object = User::find($id);
				break;
			case 8:
				$object = Comment::find($id);
				break;
			default:
				$object = Activity::find($id);
				break;
		}
		if ($object != null) {
			if ($value) {
				$object->active = true;
			}
			else {
				$object->active = false;
			}
			$object->save();
		}
		
		
	}

	public function dismissNew($type, $id) {
		$object;
		switch ($type) {	//1: answer, 2:documentation, 3:permission, 4:question, 5:subject, 6:tag, 7:user, 8:comment
			case 1:
				$object = Answer::find($id);
				break;
			case 2:
				$object = Documentation::find($id);
				break;
			case 3:
				$object = Permission::find($id);
				break;
			case 4:
				$object = Question::find($id);
				break;
			case 5:
				$object = Subject::find($id);
				break;
			case 6:
				$object = Tag::find($id);
				break;
			case 7:
				$object = User::find($id);
				break;
			case 8:
				$object = Comment::find($id);
				break;
			default:
				$object = Activity::find($id);
				break;
		}
		if ($object != null) {
			$object->is_new = false;
		
			$object->save();
		}
		
	}

}
