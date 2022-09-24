<?php

namespace App\Http\Controllers\Role\Items\Detail;

use App\Http\Controllers\Controller;
use App\Models\Challenge;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CreateChallengeItemController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

     // challengesテーブルにアクセス。チャレンジフラグをDBへ追加。
    public function __invoke(Request $request)
    {
        //
        Log::debug($request);

        // POST送信した情報を変数に全て詰める
        $all = $request->all();

        // POST送信した情報をchallengesテーブルのカラムと同じ変数名にあてる
        $challengeData = [
            'user_id' => (int) $all['userId'],
            'parent_item_id' => $all['parentItemId']
        ];

        // すでにchallengesテーブルに登録しているか確認するため、情報を取得する。
        $isChallenge = Challenge::where('user_id', '=', $challengeData['user_id'])->where('parent_item_id', '=', $challengeData['parent_item_id'])->first();

        // DBへすでに登録済みかを確認。登録していなければ登録する。
        if(!empty($isChallenge)) {
            return;
        } else {
            $challenge = new Challenge;
            $challenge->fill($challengeData)->save();
        }
    }
}
