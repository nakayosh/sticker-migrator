<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'api'], function() {
    Route::get('/stpacks/{stpack_id}', 'Api\StpacksController@getStpack')->name('api_stpack')->where('stpack_id', '[0-9]+');
    Route::get('/stpacks/search', 'Api\StpacksController@searchStpack');
    Route::get('/stpacks/recent', 'Api\StpacksController@recentStpack');
    Route::patch('/stpacks/{stpack_id}', 'Api\StpacksController@patchStpack')->where('stpack_id', '[0-9]+');
});
