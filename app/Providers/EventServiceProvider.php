<?php

namespace App\Providers;

use Illuminate\Support\Facades\Event;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'App\Events\TagEvent' => [
            'App\Listeners\TagEventListener',
        ],
        'App\Events\PointReputationEvent' => [
            'App\Listeners\PointReputationEventListener',
        ],
        'App\Events\RemoveReferencesEvent' => [
            'App\Listeners\RemoveReferencesEventListener',
        ],
        'App\Events\ActivityEvent' => [
            'App\Listeners\ActivityEventListener',
        ],
        'App\Events\ActivityBroadcast' => [
            'App\Listeners\ActivityBroadcastListener',
        ],
        'App\Events\CommentBroadcast' => [
            'App\Listeners\CommentBroadcastListener',
        ],
        'App\Events\AnswerBroadcast' => [
            'App\Listeners\AnswerBroadcastListener',
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
