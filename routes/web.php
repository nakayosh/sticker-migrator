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

Route::get('api/stpacks/{stpack_no}', 'Api\StpacksController@getPack');

Route::get('/{any?}', function () {
    return view('index');
})->where('any', '.*');
