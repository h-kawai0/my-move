<?php

namespace App\Http\Controllers\Role\Items\Detail;

use App\Http\Controllers\Controller;
use App\Models\Challenge;
use App\Models\ParentItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ShowDetailChildItemController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    // 子MyMove詳細画面の情報を取得
    public function __invoke(Request $request, $id, $pass)
    {
        $user = Auth::id();

        // パラメータから渡ってきた親MyMoveのIdを条件に、登録した子MyMoveを全て取得(退会済み・削除済みを除く)
        $parentItem = ParentItem::with('user:id,name,pic,profile','childItems:id,name,detail,parent_item_id,cleartime', 'challenges:id,user_id,parent_item_id')->select('id', 'name', 'pic', 'detail', 'user_id', 'cleartime', 'category_id', 'created_at')->where('id', $id)->whereHas('user', function($query) {
            $query->whereNull('deleted_at');
        })->first();

        // 何も取得できなければMyMove一覧へリダイレクト
        if(empty($parentItem)) {
            return response(['message' => '不正な操作が行われました。']);
        }

        // 遅延ロードで自分がチャレンジ・クリアしているか取得
        $parentItem->load(['challenges' => function($query) use($user) {
            $query->where('user_id', $user);
        }]);

        $parentItem->load(['childItems.clears' => function($query) use($user) {
            $query->where('user_id', $user);
        }]);

        // 取得した子MyMoveをforeachで全て展開
        foreach($parentItem->childItems as $key => $val) {

            // パラメータで渡ってきた子MyMoveのIdと、展開中のDBから取得した子MyMoveのIdを比較。(パラメータで渡ってきた$passが文字列型のため、intにキャストしてDBから取得した子MyMoveのIdと比較。)
            if((int) $pass === $val->id) {

                // 現在のMyMoveを変数に詰める
                $childCurrentNum = $key + 1;

                // 該当するMyMoveのデータを変数に詰める
                $childItem = $val;
                
            }
        }

        // ログイン中のユーザーがこのMymoveに挑戦しているか確認
        $challengeItem = Challenge::where('parent_item_id', '=', $id)->select('id')->where('user_id', '=', $user)->first();

        // 子MyMoveがない場合はリダイレクト
        if(empty($childItem)){
            return response(['message' => '不正な操作が行われました。']);
        }

        return response(['parentItem' => $parentItem, 'childItem' => $childItem, 'childCurrentNum' => $childCurrentNum, 'user' => $user, 'pass' => $pass, 'challengeItem' => $challengeItem]);
    }
}
