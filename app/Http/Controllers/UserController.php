<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Http\Resources\User\UserLeaderBoard;
use App\Http\Resources\User\UserList;
use App\Http\Requests\UserRequest;
use Carbon\Carbon;
use App\Http\Resources\User\UserInformation;
use App\Http\Requests\UserInformationRequest;
use Auth;
use DB;
use App\Http\Requests\PasswordRequest;
use Hash;
use App\Question;
use App\Answer;
use App\Documentation;
use App\Http\Resources\Question\QuestionRelated;
use App\Http\Resources\Documentation\DocumentationRelated;
use App\Http\Resources\Answer\AnswerRelated;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->only('update', 'logout', 'updateInformation', 'updatePassword', 'updateAvatar');
    }

    public function logout() {
        $accessToken = Auth::user()->token();

        DB::table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update([
                'revoked' => true
            ]);

        if ($accessToken->revoke()) {
            return [
                'success' => 'Logout successfully'
            ];
        }
        return [
            'errors' => 'Logout errors'
        ];
    }

    public function register(UserRequest $request)
    {
        $user = new User;
        $user->name = $request->name;
        $user->name_url = changeTitle($request->name);
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->created_at = Carbon::now();
        $user->updated_at = Carbon::now();

        if ($user->save()) {
            return [
                'success' => 'Register successfully'
            ];
        }
        return [
            'errors' => 'Register errors'
        ];
    }

    public function leaderboard()
    {
    	$result = User::where('active', true)->orderByDesc('point_reputation')->orderBy('name')->get()->take(10);
    	return UserLeaderBoard::collection($result);
    }

    public function index(Request $request)
    {
    	$words = explode(' ', $request->keyword);
		$users = User::where('users.active', true)
		->where(function ($query)use($words) {
			foreach ($words as $word) {
				$query->orWhere('name', 'LIKE', '%' . $word . '%');
			}
		})->get();
		switch ($request->sort) {
			case 'name':
			$users = $users->sortBy('name_url');
			break;
			case 'newest':
			$users = $users->sortByDesc('created_at');
			break;
            default:    //point
            $users = $users->sortByDesc('point_reputation');
            break;
        }
        $users = $this->paginate($users, 20, $request->page,['path' => LengthAwarePaginator::resolveCurrentPath()]);
    	return UserList::collection($users);
    }

    public function show($id)
    {
        return new UserInformation(User::where('active', true)->find($id));
    }

    public function updateInformation(UserInformationRequest $request)
    {
        $user = Auth::user();

        $user->name = $request->name;
        $user->status = $request->status;
        $user->about = $request->about;
        $user->location = $request->location;
        $user->job = $request->job;

        if ($user->save()) {
            return [
                'success' => 'Update information successfully'
            ];
        }
        return [
            'errors' => 'Update information errors'
        ];
    }

    public function updatePassword(PasswordRequest $request)
    {
        $user = Auth::user();

        if ($this->CheckOldPassword($user->password, $request->old_password)) {
            $user->password = bcrypt($request->new_password);
    
            if ($user->save()) {
                return [
                    'success' => 'Change password successfully'
                ];
            }
        }

        return [
            'errors' => 'Change password errors'
        ];
    }

    public function CheckOldPassword($current_password, $old_password) {
        if (!Hash::check($old_password, $current_password)) {
            return false;
        }
        return true;
    }

    public function updateAvatar(Request $request)
    {
        $user = Auth::user();

        if ($request->avatar != null) {
            $user->avatar = $this->convertBase64ToImageJPG($request->avatar);
        }

        if ($user->save()) {
            return [
                'success' => 'Update avatar successfully'
            ];
        }
        return [
            'errors' => 'Update avatar errors'
        ];
    }

    public function convertBase64ToImageJPG($base64) {
        $name = str_random(10).".jpg";
        while (file_exists(public_path()."/images/users/".$name)) {
          $name = str_random(10).".jpg";
        }
        $path = public_path()."/images/avatar_users/" . $name;
        $fp = fopen( $path, 'wb' ); 
        $data = explode( ',', $base64 );
        fwrite( $fp, base64_decode( $data[1] ) );
        fclose( $fp ); 
    
        return $name;
    }

    public function questions(Request $request, $id) {
        $questions = User::find($id)->questions->sortByDesc('created_at');
        $questions = $this->paginate($questions, 10, $request->page,['path' => LengthAwarePaginator::resolveCurrentPath()]);
        return QuestionRelated::collection($questions);
    }
    
    public function answers(Request $request, $id) {
        $answers = User::find($id)->answers->sortByDesc('created_at');
        $questions = new Collection;
        foreach ($answers as $ans) {
            $question = $ans->question;
            $question['voted'] = $this->countVote($ans->votes);
            $questions->push($question);
        }
        $answers = $this->paginate($questions, 10, $request->page,['path' => LengthAwarePaginator::resolveCurrentPath()]);
        return AnswerRelated::collection($answers);
    }

    public function documentations(Request $request, $id) {
        $documentations = User::find($id)->documentations->sortByDesc('created_at');
        $documentations = $this->paginate($documentations, 10, $request->page,['path' => LengthAwarePaginator::resolveCurrentPath()]);
        return DocumentationRelated::collection($documentations);
    }

    public function countVote($votes) {
        $countvotes_up = $votes->where('vote_action', 'up')->count();
        $countvotes_down = $votes->where('vote_action', 'down')->count();
        return $countvotes_up - $countvotes_down;
    }
}
