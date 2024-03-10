<?php

use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\TestController;
use App\Http\Controllers\Api\EmailController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::group(['namespace' => 'App\Http\Controllers\Api'], function() {
    Route::apiResource('test', TestController::class);
    Route::apiResource('email', EmailController::class);
    Route::apiResource('blog', BlogController::class);
});