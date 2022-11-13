<?php

namespace App\Http\Controllers\Role\Mypage;

use App\Http\Controllers\Controller;
use App\Mail\WithDrawMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class DeleteUserController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

     // 退会ボタンを押したユーザーを論理削除
    public function __invoke(Request $id)
    {
        
        $user = User::find($id->id);

        $user->delete();
        
        // 退会に成功したらメールを送信
        Mail::to($user)->send(new WithDrawMail($user));


        return response(['message' => '退会しました!!またのご利用をお待ちしております。'], 200);

    }
}
