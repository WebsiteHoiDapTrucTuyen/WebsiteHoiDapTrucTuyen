<?php

namespace App\Http\Resources\Activity;

use Illuminate\Http\Resources\Json\JsonResource;

class ActivityQuestion extends JsonResource
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
            'title' => $this->title
        ];
    }
}
