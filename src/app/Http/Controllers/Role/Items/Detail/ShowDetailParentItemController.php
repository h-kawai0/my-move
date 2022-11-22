<?php

namespace App\Http\Controllers\Role\Items\Detail;

use App\Http\Controllers\Controller;
use App\Models\Challenge;
use App\Models\Favorite;
use App\Models\ParentItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ShowDetailParentItemController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, $id)
    {
        if (!ctype_digit($id)) {
            return response(['message' => '不正な操作が行われました。'], 401);
        }

        // ログインの有無を条件にMyMoveをチャレンジできるか判定するためログイン情報を取得
        $user = Auth::id();

        // リクエストを受け取ったidを条件にMyMoveの情報を取得する(退会済を除く)
        $parentItem = ParentItem::with('user:id,name,pic,profile', 'childItems:id,name,detail,parent_item_id', 'category:id,name')->select('id', 'name', 'pic', 'detail', 'user_id', 'cleartime', 'category_id', 'created_at')->where('id', $id)->whereHas('user', function ($query) {
            $query->whereNull('deleted_at');
        })->first();

        $parentItem->load(['childItems.clears' => function ($query) use ($user) {
            $query->where('user_id', $user);
        }]);

        // ログイン中のユーザーがこのMyMoveに挑戦しているかDBのChallengesを取得
        $challengeItem = Challenge::where('parent_item_id', '=', $id)->select('id')->where('user_id', '=', $user)->first();


        // 親MyMoveを取得できない場合はリダイレクト
        if (empty($parentItem)) {
            return response(['message' => '不正な操作が行われました。'], 401);
        }

        $isFavorite = '';

        // ログイン中ならお気に入り登録をしているか確認
        if (!empty($user)) {

            $isFavorite = Favorite::where('parent_item_id', '=', $id)->where('user_id', '=', $user)->select('id')->first();
        } else {
            $isFavorite = null;
        }

        return response(['parentItem' => $parentItem, 'user' => $user, 'challengeItem' => $challengeItem, 'isFavorite' => $isFavorite], 200);
    }
}
