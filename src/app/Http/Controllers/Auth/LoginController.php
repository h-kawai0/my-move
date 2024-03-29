<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Rules\AlphaNumHalf;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Laravel\Fortify\Fortify;


// ログイン処理
class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    /**
     * Write code on Method
     *
     * @return response()
     */

     // ログイン処理
    public function login(Request $request)
    {
        Log::debug($request);

        // バリデーション処理
        $credentials = $request->validate([
            'email' => ['required','email:filter,dns', 'max:255'],
            'password' => ['required', 'string', new AlphaNumHalf, 'max:255', 'min:8'],
        ]);

        // ログインに成功した場合
        if (Auth::attempt($credentials, $request->remember)) {
            $request->session()->regenerate();
            return response(['message' => 'ログインに成功しました。'
        ], 200);
        }

        // ログインに失敗した場合
        throw ValidationException::withMessages([
            Fortify::username() => "メールアドレスまたはパスワードが一致しません。",
        ]);

    }
}
