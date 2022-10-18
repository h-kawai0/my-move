<?php

namespace App\Http\Controllers\Role\Mypage;

use App\Http\Controllers\Controller;
use App\Models\ParentItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

// 登録済みのMyMove一覧を取得
class GetRegistItemController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

     // 登録済みのMyMove一覧を取得
    public function __invoke(Request $request)
    {
        // ログイン中のユーザーIdを取得
        $user = Auth::id();

        // ログイン中のユーザーが登録したMyMoveがあるか確認
        $isRegist = ParentItem::where('user_id', $user)->get();

        // 登録したMyMoveの情報を詰める変数を初期化
        $items = '';

        // ログインユーザーが登録済みのMyMoveがあれば情報を取得
        if(!$isRegist->isEmpty()){
   
            $items = ParentItem::with('user:id,name,pic', 'childItems:id,name,parent_item_id', 'category:id,name')->select('id','name', 'pic', 'user_id', 'cleartime', 'category_id', 'created_at')->where('user_id', '=', $user)->paginate(1);            
        }

        return response($items, 200);
            
    }
}
