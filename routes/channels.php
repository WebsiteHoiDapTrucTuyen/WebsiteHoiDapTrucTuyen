<?php

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('activities.{id}', function () {
    return true;
});

Broadcast::channel('question.{id}.comments', function () {
    return true;
});

Broadcast::channel('documentation.{id}.comments', function () {
    return true;
});

Broadcast::channel('answer.{id}.comments', function () {
    return true;
});

Broadcast::channel('question.{id}.answers', function () {
    return true;
});
