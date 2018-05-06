<?php

namespace App\Exceptions;

use Exception;

class UserAnswerExist extends Exception
{
    public function render()
    {
    	return [
    		'errors' => 'User have been answer for this question'
    	];
    }
}
