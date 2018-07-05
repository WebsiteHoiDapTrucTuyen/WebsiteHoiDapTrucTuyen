<?php

namespace App\Listeners;

use App\Events\AnswerBroadcast;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class AnswerBroadcastListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  AnswerBroadcast  $event
     * @return void
     */
    public function handle(AnswerBroadcast $event)
    {
        //
    }
}
