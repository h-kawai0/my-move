<?php

use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\ResetPasswordController;
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

Route::post('/mypage/update-profile',[ UpdateProfileController::class, '__invoke']);


Route::get('/{any}', function () {
    return view('index');
})->where('any', '.*');


// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
