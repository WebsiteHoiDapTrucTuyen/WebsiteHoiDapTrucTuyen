<?php

namespace App\Http\Resources\Documentation;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Tag\TagList;
use App\Http\Resources\User\UserOwner;
use App\Http\Resources\Comment\CommentList;
use App\Http\Resources\Subject\SubjectResource;
use Auth;
use App\Http\Resources\Vote\VoteResource;

class DocumentationDetail extends JsonResource
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
            'title' => $this->title,
            'title_url' => $this->title_url,
            'summary' => $this->summary,
            'content' => $this->content,
            'link' => $this->link,
            'date' => $this->created_at,
            'viewed' => $this->view,
            'voted' => $this->countVote($this->votes),
            'current_user_voted' => new VoteResource($this->currentUserVoted($this->votes)),
            'tags' => TagList::collection($this->tags),
            'user' => new UserOwner($this->user),
            'comments' => CommentList::collection($this->comments),
            'subject' => new SubjectResource($this->subject),
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
