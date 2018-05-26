<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DocumentationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'subject' => 'required',
            'title' => 'required|min:16|max:256',
            'summary' => 'required|min:16|max:256',
            'content' => 'required|min:64',
            'link' => 'required|url',
            'tags' => 'required'
        ];
    }
}
