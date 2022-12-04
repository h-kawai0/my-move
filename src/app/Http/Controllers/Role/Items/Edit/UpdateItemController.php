<?php

namespace App\Http\Controllers\Role\Items\Edit;

use App\Http\Controllers\Controller;
use App\Http\Requests\ItemRequest;
use App\Models\ChildItem;
use App\Models\ParentItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Image;

// 登録済みのMyMoveを更新
class UpdateItemController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */ 

     // 登録済みのMyMoveを更新
    public function __invoke(ItemRequest $request, $id)
    {

        if (!ctype_digit($id)) {
            return response(['message' => '不正な操作が行われました。'], 400);
        }

        // 更新したい親MyMoveを取得
        $parentItem = ParentItem::find($id);

        // 子MyMoveを登録しているか確認
        if (!$parentItem->childItems->isEmpty()) {

            // DBに登録されている子MyMoveのデータを展開
            foreach ($parentItem->childItems as $dbkey => $dbVal) {

                // フォームのidとDBのidが一致するか判定するためのフラグ
                $flag = false;

                // フォームに入力された子MyMoveのデータを展開
                foreach ($request->child_item as $requestKey => $requestVal) {

                    // DBのidとフォームのidが一致しているか判定
                    // 一致していればフラグをtrueにしてループから抜ける
                    if ($dbVal['id'] === (int)$requestVal['id']) {
                        $flag = true;
                        break;
                    }
                }

                // フォームのidがDBと一致していなければリダイレクトさせる
                if (!$flag) {
                    return response(['message' => '不正な値が検出されました。'], 400);
                }
            }
        }

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
            $height = $img->height() * .7;

            // 画像のアスペクト比を維持したままリサイズする
            $img->resize($width, $height, function ($constraint) {
                $constraint->aspectRatio();
            });
            $img->save($file->getRealPath());

            // リサイズした画像をストレージへ保存
            $requestPic = $file->store('public/img/items/resize');
        }

        // 画像をリクエストしていなくてDBにパスがある場合、DBのパスを変数に詰める
        $requestPic = (empty($request->pic) && !empty($parentItem->pic)) ? $parentItem->pic : $requestPic;

        $parentItem->name = $request->parent_name;
        $parentItem->category_id = $request->category_id;
        $parentItem->cleartime = $request->parent_cleartime;
        $parentItem->detail = $request->parent_detail;

        // 画像をリクエストしている場合、更新前の画像を削除して新しいパスを保存
        if (!empty($request->pic)) {

            Storage::delete('public/img/items/original/' . $parentItem->pic);
            Storage::delete('public/img/items/resize/' . $parentItem->pic);

            $parentItem->pic = basename($requestPic);
        }

        $parentItem->save();

        // リクエストした子MyMoveを保存するためforeachで配列になっているリクエストを展開。
        foreach ($request->child_item as $key => $val) {

            // 全て入力してリクエストをしているなら該当するidを条件にMyMoveを保存。
            if (!empty($val['name']) && !empty($val['cleartime']) && !empty($val['detail'])) {

                $childItem = ChildItem::updateOrCreate(
                    ['id' => $val['id']],
                    [
                        'name' => $val['name'],
                        'detail' => $val['detail'],
                        'cleartime' => $val['cleartime'],
                        'parent_item_id' => $parentItem->id
                    ]
                );
            }

            // DBに保存済みの項目に空の状態でリクエストされたら登録済みの子MyMoveを削除する
            if (!empty($val['id']) && empty($val['name']) && empty($val['detail']) &&  empty($val['cleartime'])) {
                ChildItem::where('id', $val['id'])->forceDelete();
            }
        }

        return response(['message' => 'MyMoveを編集しました!'], 200);
    }
}
