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
        $request->validate([
            'code' => ['required', 'string', 'exists:reset_code_passwords'],
            'email' => ['required', 'email:filter,dns'],
            'password' => ['required', 'string', 'max:255', 'min:8', 'confirmed', new AlphaNumHalf],
            'password_confirmation' => ['required']
        ]);

        $passwordReset = ResetCodePassword::firstWhere('code', $request->code);

        Log::debug($passwordReset);

        if ($passwordReset->created_at > now()->addHour()) {
            $passwordReset->delete();
            return response(['message' => trans('passwords_code_is_expire')], 422);
        }

        $user = User::firstWhere('email', $passwordReset->email);

        
        $user->update($request->only('password'));
        
        $passwordReset->delete();
        Log::debug($user);

        Mail::to($request->email)->send(new SendUpdatePassword($user->name));

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
