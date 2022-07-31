<?php

namespace App\Http\Controllers\Role;

use App\Http\Controllers\Controller;
use App\Http\Requests\EditPasswordRequest;
use App\Mail\SendUpdatePassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class UpdatePasswordController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(EditPasswordRequest $request)
    {
        Log::debug($request);

        $user = Auth::user();

        $user->password = bcrypt($request->pass_new);

        $user->save();

        Mail::to($user)->send(new SendUpdatePassword($user->name));

        return response(['message' => 'パスワードを更新しました。'], 200);
    }
}
