<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Activity;
use Auth;
use App\Http\Resources\Activity\ActivityResource;
use Illuminate\Pagination\LengthAwarePaginator;

class ActivityController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(Request $request)
    {
        $activities = Auth::user()->activities;
        $activities = $activities->filter(function($activity) {
            return $activity->user_id != $activity->user_related_id;
        })->sortByDesc('created_at');

        $activities = $this->paginate($activities, 10, $request->page,['path' => LengthAwarePaginator::resolveCurrentPath()]);

        return ActivityResource::collection($activities);
    }

    public function dismissAll(Request $request)
    {
        $activities = Activity::where('user_id', Auth::id())->update([ 'is_new' => false ]);

        if ($activities) {
            return [
                'success' => 'Dismiss all successfully'
            ];
        }

        return [
            'errors' => 'Dismiss all errors'
        ];
    } 

    public function dismiss(Request $request, $id)
    {
        $activities = Activity::where(['user_id' => Auth::id(), 'id' => $id])->update([ 'is_new' => false ]);

        if ($activities) {
            return [
                'success' => 'Dismiss successfully'
            ];
        }

        return [
            'errors' => 'Dismiss errors'
        ];
    }
}
