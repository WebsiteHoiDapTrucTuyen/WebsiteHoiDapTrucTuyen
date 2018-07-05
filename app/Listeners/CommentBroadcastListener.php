<?php

namespace App\Listeners;

use App\Events\CommentBroadcast;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class CommentBroadcastListener
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
     * @param  CommentBroadcast  $event
     * @return void
     */
    public function handle(CommentBroadcast $event)
    {
        //
    }
}
