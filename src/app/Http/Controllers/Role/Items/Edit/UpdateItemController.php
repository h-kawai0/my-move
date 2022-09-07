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

class UpdateItemController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(ItemRequest $request, $id)
    {

        if (!ctype_digit($id)) {
            return response(['message' => '不正な操作が行われました。'], 200);
        }

        $parentItem = ParentItem::find($id);

        Log::debug($parentItem);

        if (!$parentItem->childItems->isEmpty()) {

            foreach ($parentItem->childItems as $dbkey => $dbVal) {

                $flag = false;

                foreach ($request->child_item as $requestKey => $requestVal) {

                    if ($dbVal['id'] === (int)$requestVal['id']) {
                        $flag = true;
                        break;
                    }
                }

                if (!$flag) {
                    return response(['message' => '不正な値が検出されました。']);
                }
            }
        }

        $requestPic = '';

        if (!empty($request->pic)) {

            $file = $request->pic;

            $file->store('public/img/items/original');

            $img = Image::make(file_get_contents($file->getRealPath()));

            $width = $img->width() * .7;
            $height = $img->height() * .7;

            $img->resize($width, $height, function ($constraint) {
                $constraint->aspectRatio();
            });
            $img->save($file->getRealPath());

            $requestPic = $file->store('public/img/items/resize');
        }

        $requestPic = (empty($request->pic) && !empty($parentItem->pic)) ? $parentItem->pic : $requestPic;

        $parentItem->name = $request->parent_name;
        $parentItem->category_id = $request->category_id;
        $parentItem->detail = $request->parent_detail;

        if (!empty($request->pic)) {

            Storage::delete('public/img/items/original/' . $parentItem->pic);
            Storage::delete('public/img/items/resize/' . $parentItem->pic);

            $parentItem->pic = basename($requestPic);
        }

        $parentItem->save();

        foreach ($request->child_item as $key => $val) {

            if (!empty($val['name']) && !empty($val['cleartime']) && !empty($val['detail'])) {

                $childItem = ChildItem::updateOrCreate(
                    ['id' => $val['id']],
                    [
                        'name' => $val['name'],
                        'detail' => $val['detail'],
                        'parent_item_id' => $parentItem->id
                    ]
                );
            }

            if (!empty($val['id']) && empty($val['name']) && empty($val['detail']) &&  empty($val['cleartime'])) {
                ChildItem::where('id', $val['id'])->forceDelete();
            }
        }

        return response(['message' => 'MyMoveを編集しました!'], 200);
    }
}
