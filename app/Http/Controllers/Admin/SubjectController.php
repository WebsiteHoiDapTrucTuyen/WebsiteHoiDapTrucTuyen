<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Auth;
use Validator;
use DateTime;
use App\Permission;
use App\User;
use App\Tag;
use App\Question;
use App\Answer;
use App\Taggable;
use App\Documentation;
use App\Comment;
use App\Subject;
use App\Activity;
use App\Ping;
use App\Vote;
use App\PasswordReset;

class SubjectController extends Controller
{
    // Admin
    public function getList(){
    	$subjects= Subject::all();
    	return view('admin.subject.list',['subjects'=>$subjects]);
    }

    public function getEdit($idSubject){
    	$subject = Subject::find($idSubject);
    	return view('admin.subject.edit',['subject'=>$subject]);
    }

    public function postEdit(Request $request, $idSubject){
    	// Validate date input
        $validator = Validator::make($request->all(), 
            [
                'name' => 'required',
                
            ],
            [
                'name.required' => 'Bạn chưa nhập tên chủ đề',
            ] 
        );
        if ($validator->fails()) {
            return redirect()->back()
            ->withErrors($validator)
            ->withInput();
        }

        //Edit Subject
        $subject = Subject::find($idSubject);
        $subject->name = $request->name;
        $subject->name_url = changeTitle($request->name);

        // $subject->is_new = true;
        $subject->updated_at = new DateTime();
        $subject->save();


        return redirect()->back()->with('thongbao', 'Cập Nhật Thành Công');  
    }

    public function getAdd() {
        return view('admin.subject.add');
    }

    public function postAdd(Request $request){
    	// Validate date input
        $validator = Validator::make($request->all(), 
            [
                'name' => 'required',
            ],
            [
                'name.required' => 'Bạn chưa nhập tên chủ đề',
            ] 
        );
        if ($validator->fails()) {
            return redirect()->back()
            ->withErrors($validator)
            ->withInput();
        }

        //Add
        $subject = new Subject;
        $subject->user_id = Auth::user()->id;
        $subject->name = $request->name;
        $subject->name_url = changeTitle($request->name);
        $subject->created_at = new DateTime();
        $subject->updated_at = new DateTime();
        $subject->save();

        return redirect()->back()->with('thongbao', 'Thêm Thành Công');  
    }

    public function getDelete($idSubject) {
        $subject = Subject::find($idSubject);

        $documentations = $subject->documentations;
        foreach ($documentations as $document) {
            $comments = $document->comments;
            //
            foreach($comments as $cmt){
                $cmt->delete();
            }
            //
            foreach ($document->tags as $tag) {
                Taggable::where([
                    ['taggable_id', $tag->pivot->taggable_id], 
                    ['tag_id', $tag->pivot->tag_id]
                ])->delete();
            }
            $document->delete();
        }

        $subject->delete();
        
        return redirect()->back()->with('thongbao', 'Xóa Thành Công');
    }

}
