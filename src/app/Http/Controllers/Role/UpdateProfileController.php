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
        Log::debug($request);

        $user = Auth::user();

        $requestPic = '';

        if (!empty($request->pic)) {

            $file = $request->pic;

            Log::debug($file);

            $file->store('public/img/user/original');

            $img = Image::make(file_get_contents($file->getRealPath()));

            $width = $img->width() * .7;
            $height = $img->height() * .7;

            $img->resize($width, $height, function ($constraint) {
                $constraint->aspectRatio();
            });
            $img->save($file->getRealPath());

            $requestPic = $file->store('public/img/user/resize');

            Log::debug($requestPic);
        }

        $requestPic = (empty($request->pic) && !empty($user->pic)) ? $user->pic : $requestPic;

        Log::debug($requestPic);

        $user->name = $request->name;
        $user->email = $request->email;
        $user->profile = $request->profile;

        if (!empty($request->pic)) {

            Log::debug($requestPic);

            Storage::delete('public/img/user/original/' . $user->pic);
            Storage::delete('public/img/user/resize/' . $user->pic);

            $user->pic = basename($requestPic);
        }

        $user->save();

        return response(['message' => 'プロフィールを更新しました。'], 200);
    }
}
