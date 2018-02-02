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
    Route::get('/stpacks/{stpack_id}', 'Api\StpacksController@getStpack')->name('api_stpack');
    Route::get('/test/{stpack_id}', 'Api\StpacksController@test');
});
