<?php

namespace App\Http\Controllers\Role;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileRequest;
use \Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class UpdateProfileController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(ProfileRequest $request)
    {

        // ユーザー情報取得
        $user = Auth::user();

        // リクエスト画像用変数
        $requestPic = '';

        // 画像がリクエストされている場合
        if (!empty($request->pic)) {

            // 変数にリクエスト画像を入れる
            $file = $request->pic;

            // 画像を保存
            $file->store('public/img/user/original');

            // 画像情報を取得
            $img = Image::make(file_get_contents($file->getRealPath()));

            $width = $img->width() * .7;
            $height = $img->height() * .7;

            //画像をリサイズ
            $img->resize($width, $height, function ($constraint) {
                $constraint->aspectRatio();
            });
            $img->save($file->getRealPath());

            // リサイズした画像を保存
            $requestPic = $file->store('public/img/user/resize');

            Log::debug($requestPic);
        }

        // 画像がリクエストされておらずDBに画像パスが保存されている場合、DBのパスを入れる
        $requestPic = (empty($request->pic) && !empty($user->pic)) ? $user->pic : $requestPic;

        Log::debug($requestPic);

        // 変更情報更新準備
        $user->name = $request->name;
        $user->email = $request->email;
        $user->profile = $request->profile;

        // 画像がリクエストされている場合
        if (!empty($request->pic)) {

            Log::debug($requestPic);

            // 既存の画像をストレージから削除
            Storage::delete('public/img/user/original/' . $user->pic);
            Storage::delete('public/img/user/resize/' . $user->pic);

            $user->pic = basename($requestPic);
        }

        $user->save();

        return response(['message' => 'プロフィールを更新しました。'], 200);
    }
}
