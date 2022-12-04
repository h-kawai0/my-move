<?php

namespace App\Http\Controllers\Role\Items\Create;

use App\Http\Controllers\Controller;
use App\Http\Requests\ItemRequest;
use App\Models\ChildItem;
use App\Models\ParentItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Image;

// STEPの新規登録
class CreateItemController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

     // STEPを新規登録する
    public function __invoke(ItemRequest $request)
    {
        // リクエストされた画像ファイル用変数を初期化
        $requestPic = '';

        // 画像がフォームからリクエストされていた場合
        if (!empty($request->pic)) {

            // リクエストされた画像情報を変数に詰める
            $file = $request->pic;

            // 元のサイズの画像をストレージへ保存
            $file->store('public/img/items/original');

            // 画像の情報を取得
            $img = Image::make(file_get_contents($file->getRealPath()));

            // width, heightを元の画像の70%に設定
            $width = $img->width() * .7;
            $height = $img->width() * .7;

            // 画像のアスペクト比を維持したままリサイズする
            $img->resize($width, $height, function ($constraint) {
                $constraint->aspectRatio();
            });
            $img->save($file->getRealPath());

            // リサイズした画像をストレージへ保存
            $requestPic = $file->store('public/img/items/resize');
        }

        $parentItem = new ParentItem;

        $parentItem->name = $request->parent_name;
        $parentItem->category_id = $request->category_id;
        $parentItem->cleartime = $request->parent_cleartime;
        $parentItem->detail = $request->parent_detail;
        $parentItem->user_id = Auth::id();

        // 画像がリクエストされているならDBへパスを保存
        if (!empty($requestPic)) {
            $parentItem->pic = basename($requestPic);
        }

        $parentItem->save();

        // リクエストされた子MyMoveを展開
        foreach ($request->child_item as $key => $val) {

            // 情報を全て入力しているなら保存
            if (!empty($val['name']) && !empty($val['cleartime']) && !empty($val['detail'])) {
                $childItem = new ChildItem;
                $childItem->parent_item_id = $parentItem->id;

                $childItem->name = $val['name'];
                $childItem->cleartime = $val['cleartime'];

                $childItem->detail = $val['detail'];

                $childItem->save();
            }
        }

        return response(['message' => 'MyMoveを登録しました!'], 200);
    }
}
