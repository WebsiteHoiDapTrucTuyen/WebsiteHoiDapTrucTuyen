<?php

namespace App\Http\Resources\Answer;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\User\UserOwner;
use App\Http\Resources\Comment\CommentList;
use Auth;
use App\Http\Resources\Vote\VoteResource;

class AnswerList extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'content' => $this->content,
            'voted' => $this->countVote($this->votes),
            'best_answer' => $this->best_answer,
            'date_answer' => $this->created_at,
            'user_owner' => new UserOwner($this->user),
            'comments' => CommentList::collection($this->comments),
            'current_user_voted' => new VoteResource($this->currentUserVoted($this->votes)),
        ];
    }

    public function countVote($votes) {
        $countvotes_up = $votes->where('vote_action', 'up')->count();
        $countvotes_down = $votes->where('vote_action', 'down')->count();
        return $countvotes_up - $countvotes_down;
    }

    public function currentUserVoted($votes) {
        $user = Auth::guard('api')->user();
        if ($user) {
            return $votes->where('user_id', $user->id)->last();
        }
        return null;
    }
}
