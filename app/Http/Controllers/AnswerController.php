<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\Answer;
use App\Http\Resources\Answer\AnswerList;
use App\Http\Requests\AnswerRequest;
use Auth;
use App\Events\ActivityEvent;
use App\Events\PointReputationEvent;
use App\Events\RemoveReferencesEvent;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Exceptions\UserAnswerExist;
use App\Events\AnswerBroadcast;

class AnswerController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth:api')->only('store', 'update', 'destroy', 'bestAnswer');
	}

	public function index(Request $request, $question_id)
	{
		$answers = Question::find($question_id)->answers
			->sortByDesc(function($answer) {
				$countvotes_up = $answer->votes->where('vote_action', 'up')->count();
				$countvotes_down = $answer->votes->where('vote_action', 'down')->count();
				return $countvotes_up - $countvotes_down;
			})->sortByDesc('best_answer');
		$answers = $this->paginate($answers, 5, $request->page,['path' => LengthAwarePaginator::resolveCurrentPath()]);
		return AnswerList::collection($answers);
	}

	public function show($answer_id) {
		return new AnswerList(Answer::find($answer_id));
	}

	public function store(AnswerRequest $request, $question_id)
	{
		$question = Question::find($question_id);

		$this->CheckUserAnswerExist($question->answers);

		$answer = new Answer;
		$answer->user_id = Auth::id();
		$answer->question_id = $question->id;
		$answer->content = $request->content;
		$answer->save();
		$channel = 'question.'.$question_id.'.answers';

		event(new ActivityEvent($question, 'đã trả lời'));
		event((new PointReputationEvent(1, 10)));
		// broadcast(new AnswerBroadcast(new AnswerList(Answer::find($answer->id)), $channel))->toOthers();

		return new AnswerList($answer);
	}

	public function update(AnswerRequest $request, $id)
	{
		$answer = Answer::find($id);

		$this->CheckOwner($answer);

		$answer->content = $request->content;
		$answer->save();

		event(new ActivityEvent($answer, 'đã chỉnh sửa'));

		return new AnswerList($answer);
	}

	public function bestAnswer($id) {
		$answer = Answer::find($id);
		$question = $answer->question;
		$this->CheckOwner($question);

		$old_best_answer = $question->answers->where('best_answer', true)->first();
		if (is_null($old_best_answer)) {
			$answer->best_answer = true;
		}
		else {
			$old_best_answer->best_answer = false;
			$old_best_answer->save();
			if ($old_best_answer->id != $answer->id) {
				$answer->best_answer = true;
			}
		}
		if ($answer->save()) {
			return [
				'success' => 'Vote best answer successfully'
			];
		}
		return response([
            'errors' => 'Vote best answer errors'
        ], 400);

	}

	public function destroy($id)
	{
		$answer = Answer::find($id);

		$this->CheckOwner($answer);

		event(new ActivityEvent($answer, 'đã xóa'));
		event(new RemoveReferencesEvent($answer));
		event((new PointReputationEvent(0, 10)));

		$answer->delete();

		return null;
	}

	public function CheckUserAnswerExist($answers) {
		if ($answers->contains('user_id', Auth::id())) {
			throw new UserAnswerExist;
		}
	}
}
