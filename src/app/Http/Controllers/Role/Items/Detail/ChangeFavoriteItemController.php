<?php

namespace App\Http\Controllers\Role\Items\Detail;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use Illuminate\Http\Request;

class ChangeFavoriteItemController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    // favoritesテーブルへアクセスしてDBを更新。
    public function __invoke(Request $request)
    {
        $all = $request->all();

        $favoriteData = [
            'user_id' => $all['userId'],
            'parent_item_id' => $all['parentItemId']
        ];

        // 親MyMoveのIdとユーザーIdを条件にお気に入りがあるか確認。
        $isFavorite = Favorite::where('parent_item_id', '=',
        $favoriteData['parent_item_id'])->where('user_id', '=', $favoriteData['user_id'])->first();

        $resultCount = '';

        if(!empty($isFavorite)) {
            $resultCount = $isFavorite->count();
        }

        // すでにお気に入りを登録しているならば削除。お気に入りじゃなければ登録する。
        if(!empty($resultCount)) {
            $isFavorite->delete();
        } else {
            $favorite = new Favorite();

            $favorite->fill($favoriteData)->save();
        }


    }
}
