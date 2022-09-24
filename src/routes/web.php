<?php

use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Role\Items\Create\CreateItemController;
use App\Http\Controllers\Role\Items\Create\NewItemController;
use App\Http\Controllers\Role\Items\Detail\CreateChallengeItemController;
use App\Http\Controllers\Role\Items\Detail\CreateClearItemController;
use App\Http\Controllers\Role\Items\Detail\ShowDetailParentItemController;
use App\Http\Controllers\Role\Items\Edit\EditItemController;
use App\Http\Controllers\Role\Items\Edit\UpdateItemController;
use App\Http\Controllers\Role\Items\Index\GetItemsController;
use App\Http\Controllers\Role\UpdatePasswordController;
use App\Http\Controllers\Role\UpdateProfileController;

use Illuminate\Support\Facades\Route;


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
// Auth::routes();

Route::post('/login', [LoginController::class, "login"]);

Route::post('/password/email', ForgotPasswordController::class);

Route::post('/password/reset', ResetPasswordController::class);

Route::post('/mypage/update-profile', [UpdateProfileController::class, '__invoke']);

Route::post('/mypage/update-password', [
    UpdatePasswordController::class, '__invoke'
]);    

//-----------------------------------------
// 親MyMove詳細
// ----------------------------------------

// 親MyMove詳細画面を表示
Route::get('/items/{id}/get', [ShowDetailParentItemController::class, '__invoke']);

// チャレンジボタンを押すとChallengesテーブルに接続して登録
Route::post('/items/challenge', [CreateChallengeItemController::class, '__invoke']);

// クリアボタンを押すとClearsテーブルに接続して登録
Route::post('/items/clear',
[CreateClearItemController::class, '__invoke']);


// -------------------------------------------
// MyMove
// --------------------------------------------
Route::get('/items/categories', [NewItemController::class, '__invoke']);

Route::post('/items', [CreateItemController::class, '__invoke']);

// MyMove更新画面を表示
Route::get('/items/{id}/edit', [EditItemController::class, '__invoke']);

Route::post('/items/{id}', [UpdateItemController::class, '__invoke']);

Route::get('/items/get',
[GetItemsController::class, '__invoke']);



Route::get('/{any}', function () {
    return view('index');
})->where('any', '.*');


// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
