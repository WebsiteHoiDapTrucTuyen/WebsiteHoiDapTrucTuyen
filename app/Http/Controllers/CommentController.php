<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;
use App\Question;
use App\Documentation;
use App\Answer;
use App\Http\Requests\CommentRequest;
use Auth;
use App\Events\ActivityEvent;
use App\Http\Resources\Comment\CommentList;
use App\Events\CommentBroadcast;

class CommentController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth:api')->only('store', 'update', 'destroy');
	}

    public function store(CommentRequest $request, $type, $id)
    {
    	$comment = new Comment;
    	$comment->user_id = Auth::id();
    	$comment->commentable_id = $id;
    	switch ($type) {
    		case 'question':
    			$comment->commentable_type = 'App\Question';
				$object = Question::find($id);
				$channel = 'question';
    			break;
    		case 'documentation':
    			$comment->commentable_type = 'App\Documentation';
				$object = Documentation::find($id);
				$channel = 'documentation';
    			break;
    		case 'answer':
    			$comment->commentable_type = 'App\Answer';
				$object = Answer::find($id);
				$channel = 'answer';
    			break;
    		default:
    			# code...
    			break;
		}
    	$comment->content = $request->content;
    	$comment->save();
		$channel = $channel.'.'.$id.'.comments';
		$action = 'addComment';

		event(new ActivityEvent($object, 'đã bình luận'));
		broadcast(new CommentBroadcast(new CommentList(Comment::find($comment->id)), $channel, $action))->toOthers();

    	return new CommentList($comment);
    }

    public function update(CommentRequest $request, $id)
    {
    	$comment = Comment::find($id);

    	$this->CheckOwner($comment);

    	$comment->content = $request->content;
		$comment->save();
		$channel = $this->generateChannel($comment->commentable_type).'.'.$comment->commentable->id.'.comments';
		$action = 'editComment';

		event(new ActivityEvent($comment, 'đã chỉnh sửa'));
		broadcast(new CommentBroadcast(new CommentList($comment), $channel, $action))->toOthers();

    	return new CommentList($comment);
    }

    public function destroy($id)
    {
    	$comment = Comment::find($id);

    	$this->CheckOwner($comment);

    	event(new ActivityEvent($comment, 'đã xóa'));

		$comment->delete();
		$channel = $this->generateChannel($comment->commentable_type).'.'.$comment->commentable->id.'.comments';
		$action = 'deleteComment';
		
		broadcast(new CommentBroadcast(new CommentList($comment), $channel, $action))->toOthers();

    	return null;
	}
	
	public function generateChannel($type) {
		switch ($type) {
    		case 'App\Question':
				return 'question';
    			break;
    		case 'App\Documentation':
				return 'documentation';
    			break;
    		case 'App\Answer':
				return 'answer';
    			break;
    		default:
    			# code...
    			break;
		}
	}
}
