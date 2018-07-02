<?php

namespace App\Listeners;

use App\Events\ActivityBroadcast;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class ActivityBroadcastListener
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
     * @param  ActivityBroadcast  $event
     * @return void
     */
    public function handle(ActivityBroadcast $event)
    {
        //
    }
}
