<?php

namespace App\Http\Controllers\Role\Mypage;

use App\Http\Controllers\Controller;
use App\Models\Challenge;
use App\Models\ParentItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

// チャレンジ中のMyMove一覧を取得
class GetChallengeItemController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

     // チャレンジ中のMyMove一覧を取得
    public function __invoke(Request $request)
    {
        // ログイン中のユーザーIdを取得
        $user = Auth::id();

        // ログイン中のユーザーがチャレンジ中のMyMoveがあるか確認
        // (退会済み・削除済みのMyMoveを除く)
        $isChallenge = Challenge::where('user_id', $user)->whereHas('parentItem', function ($query){
            $query->whereNull('deleted_at');
        })->whereHas('parentItem.user', function( $query) {
            $query->whereNull('deleted_at');
        })->get();

        // 登録したMyMoveの情報を詰める変数を初期化
        $items = '';

        // ログインユーザーがチャレンジ中のMyMoveがあれば情報を取得
        if(!$isChallenge->isEmpty()) {

            // ログインユーザーがチャレンジ中のMyMoveを条件にMyMove一覧を取得
            $items = ParentItem::with('user:id,name,pic', 'childItems:id,name,parent_item_id', 'category:id,name')->select('id', 'name', 'pic', 'user_id', 'cleartime', 'category_id', 'created_at')->whereNull('deleted_at')->whereHas('challenges', function ($query) use ($user) {
                $query->where('user_id', $user);
            })->whereHas('user', function($query){
                $query->whereNull('deleted_at');
            })->paginate(1);

            // ログインユーザーがチャレンジしているMyMoveの情報を取得
            // 上の条件だと他のユーザーがチャレンジしているMyMoveも取得してしまうため遅延ロードで読み込む
            $items->load(['challenges' => function($query) use ($user) {
                $query->where('user_id', $user);
            }]);

            // ログインしているユーザーがチャレンジしているMyMoveのクリア情報を取得
            $items->load(['childItems.clears' => function( $query) use ($user) {
                $query->where('user_id', $user);
            }]);
        }

        return response($items, 200);
    }
}
