<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Documentation;
use App\Http\Resources\Documentation\DocumentationList;
use App\Http\Resources\Documentation\DocumentationDetail;
use App\Http\Requests\DocumentationRequest;
use Auth;
use Carbon\Carbon;
use App\Events\TagEvent;
use App\Events\PointReputationEvent;
use App\Events\RemoveReferencesEvent;
use App\Exceptions\NotOwnerException;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use App\Http\Resources\Documentation\DocumentationRelated;
use App\Events\ActivityEvent;
use App\Tag;
use App\Taggable;

class DocumentationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->only('store', 'update', 'destroy');
    }

    public function index(Request $request)
    {
        switch ($request->sort) {
            case 'view':
            $documentations = Documentation::orderByDesc('view')->paginate(10);
            break;
            case 'vote':
            $documentations = Documentation::get();
            $documentations = $documentations->sortByDesc(function($documentation) {
                $countvotes_up = $documentation->votes->where('vote_action', 'up')->count();
                $countvotes_down = $documentation->votes->where('vote_action', 'down')->count();
                return $countvotes_up - $countvotes_down;
            });
            $documentations = $this->paginate($documentations, 10, $request->page,['path' => LengthAwarePaginator::resolveCurrentPath()]);
            break;
            default:    //newest
            $documentations = Documentation::orderByDesc('created_at')->paginate(10);
            break;
        }
        return DocumentationList::collection($documentations);
    }

    public function show($id)
    {
        return new DocumentationDetail(Documentation::find($id));
    }

    public function related($id) {
        $documentation = Documentation::find($id);
        $tags = $documentation->tags->unique('id');
        $all_documentation_related = new Collection;   
        foreach ($tags as $tag) {
            $documentations_related = $tag->documentations->where('id', '!=', $documentation->id)->unique('id');
            foreach ($documentations_related as $doc) {
                $all_documentation_related->push($doc);
            }  
        }

        $top10_documentation_related = $all_documentation_related->unique('id')->sortByDesc(function($documentation) {
            $countvotes_up = $documentation->votes->where('vote_action', 'up')->count();
            $countvotes_down = $documentation->votes->where('vote_action', 'down')->count();
            return $countvotes_up - $countvotes_down;
        })->take(10);

        return DocumentationRelated::collection($top10_documentation_related);
    }

    public function relatedSubject($id)
    {
        $documentation = Documentation::find($id);
        $top10_documentation_related = $documentation->subject->documentations->sortByDesc('created_at')->take(10);
        return DocumentationRelated::collection($top10_documentation_related);
    }

    public function store(DocumentationRequest $request)
    {
        // Create Model Documentation and set properties
        $documentation = new Documentation;
        $documentation->user_id = Auth::id();
        $documentation->subject_id = $request->subject;
        $documentation->title = $request->title;
        $documentation->title_url = changeTitle($request->title);
        $documentation->summary = $request->summary;
        $documentation->content = $request->content;
        $documentation->link = $request->link;
        $documentation->created_at = Carbon::now();
        $documentation->updated_at = Carbon::now();
        $documentation->save();

        event(new ActivityEvent($documentation, 'đã đăng'));
        event(new TagEvent($documentation, $request->tags));
        event((new PointReputationEvent(1, 100)));

        return new DocumentationList(Documentation::find($documentation->id));
    }

    public function update(DocumentationRequest $request, $id)
    {
        $documentation = Documentation::find($id);

        $this->CheckOwner($documentation);
        $documentation->subject_id = $request->subject;
        $documentation->title = $request->title;
        $documentation->summary = $request->summary;
        $documentation->title_url = changeTitle($request->title);
        $documentation->link = $request->link;
        $documentation->content = $request->content;
        $documentation->save();

        event(new ActivityEvent($documentation, 'đã chỉnh sửa'));
        event(new TagEvent($documentation, $request->tags));

        return new DocumentationList(Documentation::find($documentation->id));
    }

    public function increaseView($id) {
        $documentation = Documentation::find($id);

        $documentation->view = $documentation->view + 1;
        $documentation->save();

        return null;
    }

    public function destroy($id)
    {
        $documentation = Documentation::find($id);

        $this->CheckOwner($documentation);

        event(new ActivityEvent($documentation, 'đã xóa'));
        event(new RemoveReferencesEvent($documentation));
        event((new PointReputationEvent(0, 100)));

        $documentation->delete();

        return null;
    }

    public function search(Request $request)
    {
        $searchByKeyWord = $this->searchByKeyWord($request->keyword);
        $searchByTag = $this->searchByTag($request->tags);
        $searchBySubject = $this->searchBySubject($request->subject);
        $collection = $searchByKeyWord->intersect($searchByTag->intersect($searchBySubject))->sortByDesc('created_at')
        ->sortByDesc(function($documentation) {
            $countvotes_up = $documentation->votes->where('vote_action', 'up')->count();
            $countvotes_down = $documentation->votes->where('vote_action', 'down')->count();
            return $countvotes_up - $countvotes_down;
        });
        $documentations = $this->paginate($collection, 10, $request->page,['path' => LengthAwarePaginator::resolveCurrentPath()]);
        return DocumentationList::collection($documentations);
    }

    public function searchByKeyWord($keyword) {
        if ($keyword == null) {
            return Documentation::get();
        }
        else {
            $words = explode(' ', $keyword);
            $documentations = Documentation::where(function ($query)use($words) {
                foreach($words as $word) {
                    $query->orWhere('title', 'LIKE', '%' . $word . '%');
                }
            })->get();
            return $documentations;
        }
    }

    public function searchByTag($tags) {
        if ($tags == null) {
            return Documentation::get();
        }
        else {
            $arrayTags = explode(',', $tags);

            $documentations = Documentation::where(function($query) use ($arrayTags) {
                $documentations_id = Tag::join('taggables', function($join) use ($arrayTags) {
                    $join->on('taggables.tag_id', '=', 'tags.id')
                    ->where('taggables.taggable_type', '=', 'App\Documentation')
                    ->where(function($query) use ($arrayTags) {
                        foreach ($arrayTags as $tag) {
                            $query->orWhere('taggables.tag_id', '=', $tag);
                        }
                    });
                })
                ->select('taggables.taggable_id')->distinct()->get();

                $query->whereIn('id', $documentations_id);
            })->get();

            $documentations = $documentations->filter(function ($item, $key) use ($arrayTags) {
                $count = 0;
                foreach ($arrayTags as $tag) {
                    if ($item->tags->whereIn('id', $tag)->count() > 0) {
                        $count++;
                    }
                }
                if ($count >= count($arrayTags)) {
                    return true;
                }
                return false;
            });
            
            return $documentations;
        }
    }

    public function searchBySubject($subject) {
        if ($subject == null || $subject == 0) {
            return Documentation::get();
        }
        else {
            $documentations = Documentation::where('subject_id', $subject)->get();
            return $documentations;
        }
    }
}
