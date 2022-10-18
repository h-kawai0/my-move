<?php

namespace App\Http\Controllers\Role\Mypage;

use App\Http\Controllers\Controller;
use App\Models\ParentItem;
use Illuminate\Http\Request;

// 登録したMyMoveを削除する
class DeleteItemController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

     // 登録したMyMoveを削除する
    public function __invoke(Request $request, $id)
    {
        if(!ctype_digit($id)) {
            return response(['message' => '不正な操作が行われました。'], 200);
        }

        $parentItem = ParentItem::find($id);

        // 該当するMyMoveがなければリダイレクト
        if(empty($parentItem)){
            return response(['message' => '不正な操作が行われました。'], 200);
        }

        $parentItem->delete();

        return response(['message' => 'MyMoveを削除しました!']);
    }
}
