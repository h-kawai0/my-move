<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\SendCodeResetPassword;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\Request;
use App\Models\ResetCodePassword;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

// パスワードリセットリクエスト処理
class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */


    public function __invoke(Request $request)
    {

        // バリデーション処理
        $data = $request->validate([
            'email' => 'required|email:filter,dns|max:255'
        ]);

        // パスワードリセット用メールを送信
        ResetCodePassword::where('email', $request->email)->delete();

        // パスワードリセット用トークンを生成
        $data['code'] = mt_rand(100000, 999999);

        // リセット用のcodeをDBに登録
        $codeData = ResetCodePassword::create($data);

        Log::debug($codeData);

        // パスワードリセット用メールを送信
        Mail::to($request->email)->send(new SendCodeResetPassword($codeData->code));

        return response(['message' => trans('passwords.sent')], 200);
    }


    // use SendsPasswordResetEmails;
}
