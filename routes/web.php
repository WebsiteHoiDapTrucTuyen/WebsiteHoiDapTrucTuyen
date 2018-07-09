<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
//Group Admin
Route::group(['prefix' => 'admin', 'namespace' => 'Admin'], function() {
    Route::get('login', 'UserController@getLogin');
    Route::post('login', 'UserController@postLogin');
    
    Route::get('', 'ActivityController@getActivity')->middleware('admin');

    //Question
    Route::group(['prefix' => 'question', 'middleware' => 'admin'], function() {
        Route::get('list', 'QuestionController@getList');
        Route::get('add', 'QuestionController@getAdd');
        Route::post('add', 'QuestionController@postAdd');
        Route::get('edit/{idQuestion}', 'QuestionController@getEdit');
        Route::post('edit/{idQuestion}', 'QuestionController@postEdit');
        Route::get('delete/{idQuestion}', 'QuestionController@getDelete');

        Route::group(['prefix' => 'answer', 'middleware' => 'admin'], function() {
            Route::get('list/{idQuestion}', 'AnswerController@getList');
            Route::get('add/{idQuestion}', 'AnswerController@getAdd');
            Route::post('add/{idQuestion}', 'AnswerController@postAdd');
            Route::get('edit/{idAnswer}', 'AnswerController@getEdit');
            Route::post('edit/{idAnswer}', 'AnswerController@postEdit');
            Route::get('delete/{idAnswer}', 'AnswerController@getDelete');
        });
    });

    //Documents
    Route::group(['prefix' => 'documentation', 'middleware' => 'admin'], function() {
        Route::get('list','DocumentationController@getList');
        Route::get('edit/{idDocument}', 'DocumentationController@getEdit');
        Route::post('edit/{idDocument}', 'DocumentationController@postEdit');
        Route::get('delete/{idDocument}', 'DocumentationController@getDelete');
        Route::get('add','DocumentationController@getAdd');
        Route::post('add','DocumentationController@postAdd');
        
    });

     //Subject
    Route::group(['prefix' => 'subject', 'middleware' => 'admin'], function() {
        Route::get('list','SubjectController@getList');
        Route::get('edit/{idSubject}','SubjectController@getEdit');
        Route::post('edit/{idSubject}','SubjectController@postEdit');
        Route::post('add','SubjectController@postAdd');
        Route::get('add', 'SubjectController@getAdd');
        Route::get('delete/{idSubject}', 'SubjectController@getDelete');
    });    


    Route::group(['prefix' => 'comment', 'middleware' => 'admin'], function() {
        Route::get('delete/{idComment}', 'CommentController@getDelete');
    });
    
    
    Route::group(['prefix' => 'permission', 'middleware' => 'admin'], function() {
        Route::get('list', 'PermissionController@getList');
        Route::get('add', 'PermissionController@getAdd');
        Route::post('add', 'PermissionController@postAdd');
        Route::get('edit/{idPermission}', 'PermissionController@getEdit');
        Route::post('edit/{idPermission}', 'PermissionController@postEdit');
        Route::get('delete/{idPermission}', 'PermissionController@getDelete');
    });

   

    Route::group(['prefix' => 'tag', 'middleware' => 'admin'], function() {
        Route::get('list', 'TagController@getList');
        Route::get('add', 'TagController@getAdd');
        Route::post('add', 'TagController@postAdd');
        Route::get('edit/{idTag}', 'TagController@getEdit');
        Route::post('edit/{idTag}', 'TagController@postEdit');
        Route::get('delete/{idTag}', 'TagController@getDelete');
    });

     //User
   Route::group(['prefix' => 'user', 'middleware' => 'admin'], function() {
        Route::get('list','UserController@getList');
    });
    
    //Group Ajax
    Route::group(['prefix' => 'ajax', 'middleware' => 'admin'], function() {
        Route::get('commentsOfQuestion/{idQuestion}', 'AjaxController@getCommentsOfQuestion');
        Route::get('commentsOfDocument/{idDocument}', 'AjaxController@getCommentsOfDocument');
        Route::get('commentsOfAnswer/{idAnswer}', 'AjaxController@getCommentsOfAnswer');
        Route::get('changeActive/{type}/{id}/{value}', 'AjaxController@changeActive');
        Route::get('dismissNew/{type}/{id}', 'AjaxController@dismissNew');
    });
});


Route::get('{any}', function () {
    return view('home');
})->where('any', '.*');

// Auth::routes();

// Route::get('/home', 'HomeController@index')->name('home');
