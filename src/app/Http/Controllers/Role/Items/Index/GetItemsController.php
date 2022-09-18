<?php

namespace App\Http\Controllers\Role\Items\Index;

use App\Http\Controllers\Controller;
use App\Models\ParentItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class GetItemsController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {

        Log::debug($request);

        // 登録したMyMoveがあるか確認
        $isItem = ParentItem::whereHas('user', function($query) {
            $query->whereNull('deleted_at');
        })->get();

        // 登録したMyMoveの情報を詰める変数を初期化
        $items = '';

        if (!$isItem->isEmpty()) {

            Log::debug('くえりあり');


            // 退会済みのユーザーを除外した登録済みのMyMove一覧を取得(大会済み、削除済みのMyMoveを除く)
            $items = ParentItem::with('user:id,name,pic', 'childItems:id,name,parent_item_id', 'category:id,name')->select('id', 'name', 'pic', 'user_id', 'cleartime', 'category_id', 'created_at')->whereHas('user', function($query) {
                $query->whereNull('deleted_at');
            });

            // 絞り込みをリクエストしている場合
            if(!empty($request->category)) {

                // リクエストされたカテゴリーidを条件に絞り込み
                $items = $items->where('category_id', '=', $request->category);
            }

            // 並べ替えをリクエストしている場合
            if(!empty($request->sort)) {

                // 作成日を条件に並び替え
                switch($request->sort){

                    case 0:
                        break;
                    case 1:
                        $items = $items->latest('created_at');
                        break;
                    case 2:
                        $items = $items->oldest('created_at');
                        break;

                    default:
                    break;
                }
            }

            // ページネーションとMyMoveの情報を取得
            $items =$items->paginate(1);

            Log::debug($items);
            
            return response($items, 200);

        }
    }
}
