<?php

use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\GetUserController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Role\Items\Create\CreateItemController;
use App\Http\Controllers\Role\Items\Create\NewItemController;
use App\Http\Controllers\Role\Items\Detail\ChangeFavoriteItemController;
use App\Http\Controllers\Role\Items\Detail\CreateChallengeItemController;
use App\Http\Controllers\Role\Items\Detail\CreateClearItemController;
use App\Http\Controllers\Role\Items\Detail\ShowDetailChildItemController;
use App\Http\Controllers\Role\Items\Detail\ShowDetailParentItemController;
use App\Http\Controllers\Role\Items\Edit\EditItemController;
use App\Http\Controllers\Role\Items\Edit\UpdateItemController;
use App\Http\Controllers\Role\Items\Index\GetItemsController;
use App\Http\Controllers\Role\Mypage\DeleteUserController;
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

Route::get('/user/get', [GetUserController::class, '__invoke']);

// =================================================
// ログイン中のみ閲覧可能
// =================================================

// -------------------------------------------------
// マイページ
// -------------------------------------------------

// プロフィール変更
Route::post('/mypage/update-profile', [UpdateProfileController::class, '__invoke']);

// パスワード変更
Route::post('/mypage/update-password', [
    UpdatePasswordController::class, '__invoke'
]);    

// --------------------------------------
// 退会
// --------------------------------------

// 退会機能
Route::post('/withdraw', [DeleteUserController::class, '__invoke']);

//-----------------------------------------
// 親MyMove詳細
// ----------------------------------------

// チャレンジボタンを押すとChallengesテーブルに接続して登録
Route::post('/items/challenge', [CreateChallengeItemController::class, '__invoke']);

// クリアボタンを押すとClearsテーブルに接続して登録
Route::post('/items/clear',
[CreateClearItemController::class, '__invoke']);

// お気に入りボタンを押すとDBのfavoritesテーブルに接続して登録
Route::post('/items/favorite',
[ChangeFavoriteItemController::class, '__invoke']);

// -------------------------------------------
// MyMove
// --------------------------------------------

// MyMoveを作成
Route::post('/items', [CreateItemController::class, '__invoke']);

// MyMove更新画面を表示
Route::get('/items/{id}/edit', [EditItemController::class, '__invoke']);

// MyMoveを更新
Route::post('/items/{id}', [UpdateItemController::class, '__invoke']);


// ==============================================
// ログイン済み・未ログイン共通で閲覧可能
// ==============================================

// ----------------------------------------------
// MyMove 共通
// ----------------------------------------------

// カテゴリー一覧を取得
Route::get('/items/categories', [NewItemController::class, '__invoke']);

// -----------------------------------------------
// MyMove一覧
// -----------------------------------------------

// MyMove一覧を取得
Route::get('/items/get',
[GetItemsController::class, '__invoke']);

// -------------------------------------------------
// 親MyMove詳細
// -------------------------------------------------

// 親MyMove詳細画面を表示
Route::get('/items/{id}/get', [ShowDetailParentItemController::class, '__invoke']);

// -------------------------------------------
// 子MyMove詳細
// -------------------------------------------

// 子MyMoveを取得
Route::get('/items/{id}/{pass}/get',
[ShowDetailChildItemController::class, '__invoke']);






Route::get('/{any}', function () {
    return view('index');
})->where('any', '.*');


// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
