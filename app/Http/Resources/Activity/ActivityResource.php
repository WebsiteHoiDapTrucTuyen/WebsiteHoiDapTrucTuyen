<?php

namespace App\Http\Resources\Activity;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Activity\ActivityUser;
use App\Http\Resources\Activity\ActivityQuestion;
use App\Http\Resources\Activity\ActivityDocumentation;
use App\Http\Resources\Activity\ActivityAnswer;

class ActivityResource extends JsonResource
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
            'user_related' => new ActivityUser($this->user),
            'content' => $this->generateContent($this->activitable_type, $this->content),
            'object' => $this->generateObject($this->activitable_type, $this->activitable),
            'object_type' => $this->generateObjectType($this->activitable_type),
            'date' => $this->created_at,
            'is_new' => $this->is_new,
        ];
    }

    public function generateContent($activitable_type, $content)
    {
        switch ($activitable_type) {
            case 'App\Question':
                return $content.' về câu hỏi';
                break;
            
            case 'App\Documentation':
                return $content.' về tài liệu';
                break;
            
            case 'App\Answer':
                return $content.' về câu trả lời của bạn trong câu hỏi';
                break;
            
            default:
                return;
                break;
        }
    }

    public function generateObject($activitable_type, $object)
    {
        switch ($activitable_type) {
            case 'App\Question':
                return new ActivityQuestion($object);
                break;

            case 'App\Documentation':
                return new ActivityDocumentation($object);
                break;

            case 'App\Answer':
                return new ActivityAnswer($object);
                break;
            
            default:
                break;
        }
    }

    public function generateObjectType($activitable_type)
    {
        switch ($activitable_type) {
            case 'App\Question':
                return 1;
                break;

            case 'App\Documentation':
                return 2;
                break;

            case 'App\Answer':
                return 1;
                break;
            
            default:
                break;
        }
    }
    
}
