<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\SendUpdatePassword;
use App\Models\ResetCodePassword;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use App\Rules\AlphaNumHalf;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

// パスワードリセット処理
class ResetPasswordController extends Controller
{

    // public function getToken(Request $request)
    // {

    //     $result = [
    //         'email' => $request->email,
    //         'token' => $request->token
    //     ];

    //     return response()->json($result);
    // }
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    public function __invoke(Request $request)
    {
        // バリデーション処理
        $request->validate([
            'code' => ['required', 'string', 'exists:reset_code_passwords'],
            'password' => ['required', 'string', 'max:255', 'min:8', 'confirmed', new AlphaNumHalf],
            'password_confirmation' => ['required']
        ], ['exists' => '不正なリクエスト操作です。もう一度はじめからやり直してください。']);

        // パスワードコードを取得
        $passwordReset = ResetCodePassword::firstWhere('code', $request->code);

        // パスワードリセットリクエストを発行して1時間経過している場合は中断させる
        if (time() > (strtotime($passwordReset->created_at) + (60 * 30))) {
            $passwordReset->delete();
            return response(['message' => trans('passwords.token')], 401);
        }

        // パスワードリセットしたいユーザー情報を取得
        $user = User::firstWhere('email', $passwordReset->email);

        // 新しいパスワードを登録
        $user->password = bcrypt($request->password);

        $user->save();

        // パスワードリセットリクエストの情報を削除
        $passwordReset->delete();
        Log::debug($user);

        // パスワードリセット完了のメールを送信
        Mail::to($passwordReset->email)->send(new SendUpdatePassword($user->name));

        return response(['message' => 'パスワードがリセットされました。'], 200);
    }

    use ResetsPasswords;

    /**
     * Where to redirect users after resetting their password.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;
}
