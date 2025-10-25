<?php

use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\TestController;
use App\Http\Controllers\Api\EmailController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\TagsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::group(['namespace' => 'App\Http\Controllers\Api'], function() {
    Route::apiResource('test', TestController::class);
    Route::apiResource('email', EmailController::class);
    Route::apiResource('tags', TagsController::class);
    Route::apiResource('login', LoginController::class);
    
    // Public
    Route::apiResource('post', PostController::class)->only(['index', 'show']);
    
    // Protected
    Route::middleware(['admin'])->group(function () {
        Route::apiResource('post', PostController::class)->only(['store', 'update', 'show', 'destroy']);
    });
});