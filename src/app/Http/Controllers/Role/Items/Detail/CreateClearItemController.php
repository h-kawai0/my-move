<?php

namespace App\Http\Controllers\Role\Items\Detail;

use App\Http\Controllers\Controller;
use App\Models\Clear;
use Illuminate\Http\Request;

class CreateClearItemController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

     // clearsテーブルにアクセス。DBを更新。
    public function __invoke(Request $request)
    {
        $all = $request->all();

        $progressData = [
            'user_id' => (int) $all['userId'],
            'child_item_id' => $all['childItemId'],
            'parent_item_id' => $all['parentItemId']
        ];

        // 自分がクリアしたレコードが無いか確認。
        $isProgress = Clear::where('user_id', '=', $progressData['user_id'])
        ->where('child_item_id', '=', $progressData['child_item_id'])
        ->where('parent_item_id', '=', $progressData['parent_item_id'])
        ->first();

        // クリアしているならば何もしない。クリアしていないならばクリアにする。
        if(!empty($isProgress)) {
            return;
        } else {
            $progress = new Clear;
            $progress->fill($progressData)->save();
        }
    }
}
