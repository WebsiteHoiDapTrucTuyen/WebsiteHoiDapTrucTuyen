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

class TagController extends Controller
{
    // Admin
    public function getList() {
        $tags = Tag::all();
        return view('admin.tag.list', ['tags' => $tags]);
    }

    public function getAdd() {
        return view('admin.tag.add');
    }

    public function postAdd(Request $request) {
        // Validate date input
        $validator = Validator::make($request->all(), 
            [
                'name' => 'required',
                'description' => 'required',
            ],
            [
                'name.required' => 'Bạn chưa nhập tên thẻ',
                'description.required' => 'Bạn chưa nhập mô tả cho thẻ',
            ] 
        );
        if ($validator->fails()) {
            return redirect()->back()
            ->withErrors($validator)
            ->withInput();
        }

        // Create Model Tag and set properties
        $tag = new Tag;
        $tag->user_id = Auth::user()->id;
        $tag->name = $request->name;
        $tag->name_url = changeTitle($request->name);
        $tag->description = $request->description;
        $tag->created_at = new DateTime();
        $tag->updated_at = new DateTime();
        $tag->save();  // Save into database


        return redirect()->back()->with('thongbao', 'Thêm Thành Công');
    }

    public function getEdit($idTag) {
        $tag = Tag::find($idTag);
        return view('admin.tag.edit', ['tag' => $tag]);
    }

    public function postEdit(Request $request, $idTag) {
        // Validate date input
        $validator = Validator::make($request->all(), 
            [
                'name' => 'required',
                'description' => 'required',
            ],
            [
                'name.required' => 'Bạn chưa nhập tên thẻ',
                'description.required' => 'Bạn chưa nhập mô tả cho thẻ',
            ] 
        );
        if ($validator->fails()) {
            return redirect()->back()
            ->withErrors($validator)
            ->withInput();
        }

        // Create Model Tag and set properties
        $tag = Tag::find($idTag);
        $tag->name = $request->name;
        $tag->name_url = changeTitle($request->name);
        $tag->description = $request->description;
        // $tag->is_new = true;
        $tag->updated_at = new DateTime();
        $tag->save();  // Save into database


        return redirect()->back()->with('thongbao', 'Cập Nhật Thành Công');
    }

    public function getDelete($idTag) {
        $tag = Tag::find($idTag);

        // Delete all taggable of question tagged
        foreach ($tag->questions as $question) {
            Taggable::where([
                ['taggable_id', $question->pivot->taggable_id], 
                ['tag_id', $question->pivot->tag_id]
            ])->delete();
        }
        // Delete all taggable of documentation tagged
        foreach ($tag->documentations as $documentation) {
            Taggable::where([
                ['taggable_id', $documentation->pivot->taggable_id], 
                ['tag_id', $documentation->pivot->tag_id]
            ])->delete();
        }
        // Delete all taggable of user tagged
        foreach ($tag->users as $user) {
            Taggable::where([
                ['taggable_id', $user->pivot->taggable_id], 
                ['tag_id', $user->pivot->tag_id]
            ])->delete();
        }

        $tag->delete(); // Delete tag


        return redirect()->back()->with('thongbao', 'Xóa Thành Công');
    }
}
