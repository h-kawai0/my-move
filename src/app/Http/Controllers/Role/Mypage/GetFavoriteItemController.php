<?php

namespace App\Http\Controllers\Role\Mypage;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use App\Models\ParentItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

// お気に入りのMyMove一覧を取得
class GetFavoriteItemController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    // お気に入りのMyMove一覧を取得
    public function __invoke(Request $request)
    {
        // ログイン中のユーザーIdを取得
        $user = Auth::id();

        // ログイン中のユーザーがお気に入りのMyMoveがあるか確認
        // (退会済みか削除済みのMyMoveを除く)
        $isFavorites = Favorite::where('user_id', $user)
            ->whereHas('parentItem', function ($query) {
                $query->whereNull('deleted_at');
            })
            ->whereHas('parentItem.user', function ($query) {
                $query->whereNull('deleted_at');
            })
            ->get();

        $items = '';

        Log::debug("messag");

        // お気に入りがあれば情報を取得
        if (!$isFavorites->isEmpty()) {

            $items = ParentItem::with('user:id,name,pic', 'childItems:id,name,parent_item_id', 'category:id,name')->select('id', 'name', 'pic', 'user_id', 'cleartime', 'category_id', 'deleted_at', 'created_at')->whereNull('deleted_at')->whereHas('favorite', function ($query) use ($user) {
                $query->where('user_id', $user);
            })->whereHas('user', function ($query) {
                $query->whereNull('deleted_at');
            })->paginate(1);

            // 遅延ロードで自分がお気に入りのもののみを読み込む。
            $items->load(['favorite' => function ($query) use ($user) {
                $query->where('user_id', $user);
            }]);
        }

        return response($items, 200);
    }
}
